import ActionCell from "@/UI/Elements/Table/ActionCell";
import CustomTableWrapper from "@/UI/Container/CustomTableWrapper";
import UILayout from "@/UI/Elements/Layout";
import { setFormOpen } from "@/slice/layoutSlice";
import { useDispatch } from "react-redux";
import { useGetChildrenListQuery } from "@/service/children";
import { Plus } from "lucide-react";

const Departments = () => {
  const dispatch = useDispatch();

  const childrenTableColumns: ColumnDefinition<RowData>[] = [
    {
      header: "Name",
      class: "pl-5",
      enableSorting: true,
      accessor: "name",
      cell: (info) => <span>{info.getValue()}</span>,
      cellClass: "pl-4 text-black",
      headerClass: "pl-4 ",
    },
    {
      header: "Age",
      class: "pl-5",
      accessor: "age",
      cell: (info) => <span>{info.getValue()}</span>,
      cellClass: "pl-4 text-black ",
      headerClass: "pl-4",
    },
    {
      header: "Grade",
      class: "pl-5",
      accessor: "grade",
      cell: (info) => <span>{info.getValue()}</span>,
      cellClass: "pl-4 text-black ",
      headerClass: "pl-4",
    },
    {
      header: "actions",
      accessor: "available_actions",
      class: "flex justify-center",
      headerClass: "flex justify-center",
      cellClass: "flex justify-center",
      cell: ({ row }) => {
        const updatedRow = {
          ...row,
          original: {
            ...row.original,
            available_actions: {
              view: false,
              update: true,
              delete: true,
            },
          },
        };
        return (
          <ActionCell
            row={updatedRow}
            viewUrl="children"
            formComponent="addChildren"
            deleteComponent="deleteChildren"
          />
        );
      },
    },
  ];

  const buttons = [
    {
      label: "Add New Children",
      icon: <Plus />,
      onClick: () => dispatch(setFormOpen({ sheetComponent: "addChildren" })),
    },
  ];

  return (
    <div>
      <UILayout>
        <h1 className="text-3xl font-semibold m-2 mx-4">{"Children"}</h1>
        <CustomTableWrapper
          fetchData={useGetChildrenListQuery}
          columns={childrenTableColumns}
          buttons={buttons}
        />
      </UILayout>
    </div>
  );
};

export default Departments;
