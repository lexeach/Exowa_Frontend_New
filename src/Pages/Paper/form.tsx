import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddPaperMutation } from "@/service/paper";
import { ErrorToaster, SuccessToaster } from "@/UI/Elements/Toast";
import { useGetSubjectOptionsMutation } from "@/service/subject";
import { useGetSyllabusOptionsMutation } from "@/service/syllabus";
import DynamicForm from "@/UI/Form/DynamicForm";
import FixedButtons from "@/UI/Form/FixedButton";
import SheetHeader from "@/UI/Sheet/header";
import UIButton from "@/UI/Elements/Button";
import { setRefresh, setDialogClose } from "@/slice/layoutSlice";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { fields, schema } from "./config";
import { Loader } from "lucide-react";

type PaperFormProps = {
  handleCancel: () => void;
  sheet: { id?: string };
};

const PapersForm: React.FC<PaperFormProps> = ({ handleCancel, sheet }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [createPaper, { isLoading: isCreateLoading }] = useAddPaperMutation();

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    try {
      await createPaper(formData).unwrap();
      SuccessToaster("Records Created Successfully");
      dispatch(setRefresh());
      dispatch(setDialogClose());
      handleCancel();
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
        {isCreateLoading ? (
          <>
            <Loader className="h-5 w-5 animate-spin" />
            <span className="mx-3">Loading...</span>
          </>
        ) : sheet?.id ? (
          "Save Changes"
        ) : (
          "Generate Questions"
        )}
      </UIButton>
    </div>
  );
  return (
    <div className="">
      <SheetHeader title={"Generate New Questions"} />
      <div className="layout-container h-[75vh] overflow-auto">
        <div className="mt-6">
          <div className="layout-container mt-6">
            <div className="grid md:grid-cols-1 grid-cols-1 gap-6">
              <div>
                {(!sheet.id || (sheet.id && Object.keys(data)).length > 0) && (
                  <DynamicForm
                    fields={fields(
                      useGetSubjectOptionsMutation,
                      useGetSyllabusOptionsMutation
                    )}
                    onSubmit={(val) => {
                      setData({ ...data, ...val });
                    }}
                    // loading={false}
                    useFormMethods={methods}
                    showButton={false}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FixedButtons CustomComponent={Footer} nextLabel={""} prevLabel={""} />
    </div>
  );
};

export default PapersForm;
