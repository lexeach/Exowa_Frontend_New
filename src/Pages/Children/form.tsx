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
// Import the dynamic logic helper from config
import { fields, schema, getTopicsByGrade } from "./config"; 

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
  const [createChildren, { isLoading: isCreateLoading }] = useAddChildrenMutation();
  const [updateChildren] = useUpdateChildrenMutation();

  const methods = useForm<ChildrenFormValues>({
    resolver: yupResolver(schema) as Resolver<ChildrenFormValues>,
    defaultValues: {
      topics: [],
    },
  });

  // Watch grade to update options and topics to manage validation
  const selectedGrade = useWatch({ control: methods.control, name: "grade" });
  const selectedTopics = useWatch({ control: methods.control, name: "topics", defaultValue: [] });

  // Handle Edit Mode Reset
  useEffect(() => {
    if (singleChildren?.data) {
      const { name, age, grade, topics, topicLimit: limit } = singleChildren?.data;
      const resolvedLimit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 1;
      setTopicLimit(resolvedLimit);

      methods.reset({
        name,
        age,
        grade,
        topics: Array.isArray(topics) ? topics.slice(0, resolvedLimit) : [],
      });
    }
  }, [singleChildren?.data, methods]);

  // IMPORTANT: Clear topics selection when grade changes to prevent mismatched data
  const prevGradeRef = useRef(selectedGrade);
  useEffect(() => {
    if (prevGradeRef.current !== selectedGrade) {
      methods.setValue("topics", []);
      prevGradeRef.current = selectedGrade;
    }
  }, [selectedGrade, methods]);

  const handleTopicSelection = useCallback(
    (value?: string[]) => {
      if (!Array.isArray(value)) return;
      if (value.length > topicLimit) {
        methods.setValue("topics", value.slice(0, topicLimit), {
          shouldTouch: true,
          shouldDirty: true,
        });
      }
    },
    [methods, topicLimit]
  );

  // Limit enforcement logic
  const limitReachedRef = useRef(false);
  useEffect(() => {
    if (!Array.isArray(selectedTopics)) return;

    if (selectedTopics.length < topicLimit) {
      methods.setError("topics", {
        type: "manual",
        message: `Please select ${topicLimit} topic${topicLimit > 1 ? "s" : ""} to reach your topic limit`,
      });
      limitReachedRef.current = false;
    } else {
      methods.clearErrors("topics");
      if (topicLimit > 0 && selectedTopics.length === topicLimit && !limitReachedRef.current) {
        SuccessToaster("You have reached your limit");
        limitReachedRef.current = true;
      }
    }
  }, [methods, selectedTopics, topicLimit]);

  // Generate dynamic fields based on selectedGrade
  const childFormFields = useMemo(() => {
    // Get dynamic options based on current grade selection
    const dynamicOptions = getTopicsByGrade(selectedGrade);

    return fields.map((field) =>
      field.name === "topics"
        ? {
            ...field,
            options: dynamicOptions, // Pass the grade-specific options here
            getValueCallback: handleTopicSelection,
            caption: selectedTopics.length === topicLimit ? "You have reached your limit" : "",
          }
        : field
    );
  }, [selectedGrade, handleTopicSelection, selectedTopics.length, topicLimit]);

  const onSubmit = async (formData: ChildrenFormValues) => {
    try {
      const payload = { ...formData, topics: (formData.topics || []).slice(0, topicLimit) };
      if (sheet?.id) {
        await updateChildren({ id: sheet?.id, ...payload }).unwrap();
        SuccessToaster("Records Update Successfully");
      } else {
        await createChildren(payload).unwrap();
        SuccessToaster("Records Created Successfully");
      }
      handleCancel();
      dispatch(setRefresh());
    } catch (error: any) {
      ErrorToaster(error?.data?.message || "Something Went Wrong");
    }
  };

  const Footer = () => (
    <div className="flex justify-end mt-3 layout-container">
      <UIButton variant="outline" className="mr-4 rtl:ml-4" onClick={handleCancel}>Cancel</UIButton>
      <UIButton type="submit" onClick={methods.handleSubmit(onSubmit)} disabled={isCreateLoading}>
        {sheet?.id ? "Save Changes" : "Save"}
      </UIButton>
    </div>
  );

  return (
    <div>
      <SheetHeader title={sheet?.id ? "Edit children" : "Add New children"} />
      <div className="layout-container h-[75vh] overflow-auto">
        <div className="mt-6">
          <DynamicForm
            fields={childFormFields}
            onSubmit={onSubmit}
            useFormMethods={methods}
            showButton={false}
          />
        </div>
      </div>
      <FixedButtons CustomComponent={Footer} nextLabel="" prevLabel="" />
    </div>
  );
};

export default PapersForm;
