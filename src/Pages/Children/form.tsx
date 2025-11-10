import { ErrorToaster, SuccessToaster } from "@/UI/Elements/Toast";
import { Resolver, useForm } from "react-hook-form";
import {
  useAddChildrenMutation,
  useUpdateChildrenMutation,
  useGetSingleChildrenQuery,
} from "@/service/children";
import { useEffect, useMemo, useState } from "react";

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
      setTopicLimit(
        Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 1
      );

      methods.reset({
        name,
        age,
        grade,
        topics: topics ?? [],
      });
    } else {
      setTopicLimit(1);
      methods.reset({
        topics: [],
      });
    }
  }, [singleChildren?.data, methods]);

  const onSubmit = async (formData) => {
    try {
      const payload = { ...formData };
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

  const limitedTopicOptions = useMemo(() => {
    const numericLimit = Number(topicLimit);
    const limit = Number.isFinite(numericLimit)
      ? Math.max(0, Math.min(baseTopicOptions.length, Math.floor(numericLimit)))
      : baseTopicOptions.length;

    return baseTopicOptions.slice(0, limit);
  }, [topicLimit, baseTopicOptions]);

  const childFormFields = useMemo(
    () =>
      fields.map((field) =>
        field.name === "topics"
          ? {
              ...field,
              options: limitedTopicOptions,
            }
          : field
      ),
    [limitedTopicOptions]
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
