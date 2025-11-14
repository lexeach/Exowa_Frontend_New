import { ErrorToaster, SuccessToaster } from "@/UI/Elements/Toast";
import { Resolver, useForm, useWatch } from "react-hook-form";
import {
  useAddChildrenMutation,
  useUpdateChildrenMutation,
  useGetSingleChildrenQuery,
} from "@/service/children";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import DynamicForm from "@/UI/Form/DynamicForm";
import FixedButtons from "@/UI/Form/FixedButton";
import SheetHeader from "@/UI/Sheet/header";
import UIButton from "@/UI/Elements/Button";
import { setRefresh } from "@/slice/layoutSlice";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { fields, schema } from "./config";

type PaperFormProps = {
  handleCancel: () => void;
  sheet: { id?: string };
};

type ChildrenFormValues = {
  name?: string;
  age?: string;
  grade?: string;
  topics?: string[];
};

const PapersForm: React.FC<PaperFormProps> = ({ handleCancel, sheet }) => {
  const dispatch = useDispatch();
  const [topicLimit, setTopicLimit] = useState(1);

  const { data: singleChildren } = useGetSingleChildrenQuery(sheet?.id, {
    skip: !sheet?.id,
  });
  const [createChildren, { isLoading: isCreateLoading }] =
    useAddChildrenMutation();

  const [updateChildren] = useUpdateChildrenMutation();

  const methods = useForm<ChildrenFormValues>({
    resolver: yupResolver(schema) as Resolver<ChildrenFormValues>,
    defaultValues: {
      topics: [],
    },
  });

  useEffect(() => {
    if (singleChildren?.data) {
      const { name, age, grade, topics, topicLimit: limit } = singleChildren?.data;
      const resolvedLimit =
        Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 1;
      setTopicLimit(resolvedLimit);

      const sanitizedTopics = Array.isArray(topics)
        ? topics.slice(0, resolvedLimit)
        : [];

      methods.reset({
        name,
        age,
        grade,
        topics: sanitizedTopics,
      });
    } else {
      setTopicLimit(1);
      methods.reset({
        topics: [],
      });
    }
  }, [singleChildren?.data, methods]);

  const selectedTopics = useWatch({
    control: methods.control,
    name: "topics",
    defaultValue: [],
  });

  const handleTopicSelection = useCallback(
    (value?: string[]) => {
      if (!Array.isArray(value)) {
        return;
      }

      if (value.length > topicLimit) {
        const limitedValues = value.slice(0, topicLimit);
        methods.setValue("topics", limitedValues, {
          shouldTouch: true,
          shouldDirty: true,
        });
      }
    },
    [methods, topicLimit]
  );

  const limitReachedRef = useRef(false);

  useEffect(() => {
    if (!Array.isArray(selectedTopics)) {
      return;
    }

    if (selectedTopics.length < topicLimit) {
      methods.setError("topics", {
        type: "manual",
        message: `Please select ${topicLimit} topic${topicLimit > 1 ? "s" : ""} to reach your topic limit`,
      });
      limitReachedRef.current = false;
    } else {
      methods.clearErrors("topics");

      if (
        topicLimit > 0 &&
        selectedTopics.length === topicLimit &&
        !limitReachedRef.current
      ) {
        SuccessToaster("You have reached your limit");
        limitReachedRef.current = true;
      }
    }
  }, [methods, selectedTopics, topicLimit]);

  const topicLimitMessage = useMemo(() => {
    if (!Array.isArray(selectedTopics)) {
      return "";
    }

    if (selectedTopics.length === topicLimit && topicLimit > 0) {
      return "You have reached your limit";
    }

    return "";
  }, [selectedTopics, topicLimit]);

  const onSubmit = async (formData: ChildrenFormValues) => {
    try {
      const topics = Array.isArray(formData.topics) ? formData.topics : [];

      if (topics.length < topicLimit) {
        methods.setError("topics", {
          type: "manual",
          message: `Please select ${topicLimit} topic${topicLimit > 1 ? "s" : ""} to reach your topic limit`,
        });
        return;
      }

      let normalizedTopics = topics;

      if (topics.length > topicLimit) {
        normalizedTopics = topics.slice(0, topicLimit);
        methods.setValue("topics", normalizedTopics, {
          shouldDirty: true,
        });
      }

      const payload = { ...formData, topics: normalizedTopics };
      // return;
      if (sheet?.id) {
        await updateChildren({ id: sheet?.id, ...payload }).unwrap();
        SuccessToaster("Records Update Successfully");
      } else {
        await createChildren(payload).unwrap();
        SuccessToaster("Records Created Successfully");
      }
      handleCancel();
      dispatch(setRefresh());
    } catch (error) {
      
      ErrorToaster(error?.data?.message || "Something Went Wrong");
    }
  };

  const baseTopicOptions = useMemo(() => {
    const topicField = fields.find((field) => field.name === "topics");
    return topicField?.options || [];
  }, []);

  const childFormFields = useMemo(
    () =>
      fields.map((field) =>
        field.name === "topics"
          ? {
              ...field,
              options: baseTopicOptions,
              getValueCallback: handleTopicSelection,
              caption: topicLimitMessage,
            }
          : field
      ),
    [baseTopicOptions, handleTopicSelection, topicLimitMessage]
  );

  const Footer = () => (
    <div className="flex justify-end mt-3 layout-container">
      <UIButton
        variant="outline"
        className="mr-4 rtl:ml-4"
        onClick={handleCancel}
      >
        {"Cancel"}
      </UIButton>
      <UIButton
        type="submit"
        onClick={methods.handleSubmit(onSubmit)}
        disabled={isCreateLoading}
      >
        {sheet?.id ? "Save Changes" : "Save"}
      </UIButton>
    </div>
  );

  return (
    <div className="">
      <SheetHeader title={sheet?.id ? "Edit children" : "Add New children"} />
      <div className="layout-container h-[75vh] overflow-auto">
        <div className="mt-6">
          <div className="layout-container mt-6">
            <div className="grid md:grid-cols-1 grid-cols-1 gap-6">
              <div>
                {
                  <DynamicForm
                    fields={childFormFields}
                    onSubmit={onSubmit}
                    useFormMethods={methods}
                    showButton={false}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <FixedButtons CustomComponent={Footer} nextLabel="" prevLabel="" />
    </div>
  );
};

export default PapersForm;
