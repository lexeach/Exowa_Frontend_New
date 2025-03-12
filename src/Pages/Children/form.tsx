import { ErrorToaster, SuccessToaster } from "@/UI/Elements/Toast";
import { useForm } from "react-hook-form";
import {
  useAddChildrenMutation,
  useUpdateChildrenMutation,
  useGetSingleChildrenQuery,
} from "@/service/children";
import { useEffect, useState } from "react";

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

const PapersForm: React.FC<PaperFormProps> = ({ handleCancel, sheet }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const { data: singleChildren } = useGetSingleChildrenQuery(sheet?.id, {
    skip: !sheet?.id,
  });
  const [createChildren, { isLoading: isCreateLoading }] =
    useAddChildrenMutation();

  const [updateChildren] =
    useUpdateChildrenMutation();

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  //name age grade

  useEffect(() => {
    if (singleChildren?.data) {
      const { name, age, grade } = singleChildren?.data;
      methods.reset({ name, age, grade });
    }
  }, [singleChildren?.data]);

  const onSubmit = async (formData) => {
    try {
      // return;
      if (sheet?.id) {
        await updateChildren({ id: sheet?.id, ...formData }).unwrap();
        SuccessToaster("Records Update Successfully");
      } else {
        await createChildren(formData).unwrap();
        SuccessToaster("Records Created Successfully");
      }
      handleCancel();
      dispatch(setRefresh());
    } catch (error) {
      ErrorToaster(error?.data?.message || "Something Went Wrong");
    }
  };

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
        {sheet?.id ? "Cave Changes" : "Save"}
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
                    fields={fields}
                    onSubmit={(val) => {
                      setData({ ...data, ...val });
                    }}
                    loading={false}
                    useFormMethods={methods}
                    showButton={false}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <FixedButtons CustomComponent={Footer} />
    </div>
  );
};

export default PapersForm;
