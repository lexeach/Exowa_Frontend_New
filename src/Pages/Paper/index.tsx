import ActionCell from '@/UI/Elements/Table/ActionCell';
import CustomTableWrapper from '@/UI/Container/CustomTableWrapper';
import UILayout from '@/UI/Elements/Layout';
import { setFormOpen } from '@/slice/layoutSlice';
import { useDispatch } from 'react-redux';
import { useGetPaperListQuery } from '@/service/paper';
import { Plus } from 'lucide-react';

const Papers = () => {
  const dispatch = useDispatch();

  const paperTableColumns = [
      {
        header:'Subject',
        class: 'pl-5',
        enableSorting: true,
        accessor: 'subject',
        cell: info => <span>{info.getValue()}</span>,
        cellClass: 'pl-4 text-black',
        headerClass: 'pl-4 ',
      },
     
      {
        header:'Syllabus',
        class: 'pl-5',
        accessor: 'syllabus',
        cell: info => <span>{info.getValue()}</span>,
        cellClass: 'pl-4 text-black ',
        headerClass: 'pl-4',
      },
      {
        header:'Language',
        class: 'pl-5',
        accessor: 'language',
        cell: info => <span>{info.getValue()}</span>,
        cellClass: 'pl-4 text-black ',
        headerClass: 'pl-4',
      },{
        header:'Chapter From',
        class: 'pl-5',
        accessor: 'chapter_from',
        cell: info => <span>{info.getValue()}</span>,
        cellClass: 'pl-4 text-black ',
        headerClass: 'pl-4',
      },{
        header:'Chapter To',
        class: 'pl-5',
        accessor: 'chapter_to',
        cell: info => <span>{info.getValue()}</span>,
        cellClass: 'pl-4 text-black ',
        headerClass: 'pl-4',
      },
      {
        header:'OTP',
        class: 'pl-5',
        accessor: 'otp',
        cell: info => <span>{info.getValue() ? info.getValue() : <span className=''> - - - - - </span>}</span>,
        cellClass: 'pl-4 text-black ',
        headerClass: 'pl-4',
      },
      {
        header: "CreatedAt",
        class: "pl-5",
        accessor: "createdAt",
        cell: (info) => <span>{info.getValue()}</span>,
        cellClass: "pl-4 text-black ",
        headerClass: "pl-4",
      },
      {
        header:'actions',
        accessor: 'available_actions',
        class: 'flex justify-center',
        headerClass: 'flex justify-center',
        cellClass: 'flex justify-center',
        cell: ({ row }) => {
  
          const updatedRow = {
            ...row,
            original: {
              ...row.original,
              available_actions: {
                view: true,
                update: false,
                delete: true,
              },
            },
          };
         return <ActionCell
            row={updatedRow}
            viewUrl="papers"
            formComponent="addPaper"
            deleteComponent="deletePaper"
          />
        },
      },
    ];

  const buttons = [
    {
      label: ('Generate New Paper'),
      icon: <Plus />,
      onClick: () => dispatch(setFormOpen({ sheetComponent: 'addPaper' })),
    },
  ];

  return (
    <div>
      <UILayout>
        <h1 className="text-3xl font-semibold m-2 mx-4">{('Paper')}</h1>
        <CustomTableWrapper
          fetchData={useGetPaperListQuery}
          columns={paperTableColumns}
          buttons={buttons}
        />
      </UILayout>
    </div>
  );
};



export default Papers;
