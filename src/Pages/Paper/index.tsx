import ActionCell from "@/UI/Elements/Table/ActionCell";
import CustomTableWrapper from "@/UI/Container/CustomTableWrapper";
import UILayout from "@/UI/Elements/Layout";
import { setFormOpen } from "@/slice/layoutSlice";
import { useDispatch } from "react-redux";
import { useGetPaperListQuery } from "@/service/paper";
import { Plus } from "lucide-react";

const Papers = () => {
  const dispatch = useDispatch();
  console.log(useGetPaperListQuery, "useGetPaperListQueryuseGetPaperListQuery");
  const paperTableColumns = [
    {
      header: "Subject",
      class: "pl-5",
      enableSorting: true,
      accessor: "subject",
      cell: (info) => <span>{info.getValue()}</span>,
      cellClass: "pl-4 text-black",
      headerClass: "pl-4 ",
    },

    // {
    // header: 'Syllabus',
    // class: 'pl-5',
    //   accessor: 'syllabus',
    //   cell: info => <span>{info.getValue()}</span>,
    //   cellClass: 'pl-4 text-black ',
    //   headerClass: 'pl-4',
    // },

    {
      header: "Class",
      class: "pl-5",
      accessor: "className",
      cell: (info) => <span>{info.getValue()}</span>,
      cellClass: "pl-4 text-black ",
      headerClass: "pl-4",
    },

    {
      header: "Language",
      class: "pl-5",
      accessor: "language",
      cell: (info) => <span>{info.getValue()}</span>,
      cellClass: "pl-4 text-black ",
      headerClass: "pl-4",
    },
    {
      header: "Chapter From",
      class: "pl-5",
      accessor: "chapter_from",
      cell: (info) => <span>{info.getValue()}</span>,
      cellClass: "pl-4 text-black ",
      headerClass: "pl-4",
    },
    {
      header: "Chapter To",
      class: "pl-5",
      accessor: "chapter_to",
      cell: (info) => <span>{info.getValue()}</span>,
      cellClass: "pl-4 text-black ",
      headerClass: "pl-4",
    },
    {
      header: "OTP",
      class: "pl-5",
      accessor: "otp",
      cell: (info) => (
        <span>
          {info.getValue() ? (
            info.getValue()
          ) : (
            <span className=""> - - - - - </span>
          )}
        </span>
      ),
      cellClass: "pl-4 text-black ",
      headerClass: "pl-4",
    },
    {
      header: "CreatedAt",
      class: "pl-5",
      accessor: "createdAt",
      cell: (info) => {
        const rawDate = info.getValue();
        if (!rawDate) return <span>-</span>; // Handle cases where date might be null or undefined

        try {
          const date = new Date(rawDate);
          // Check if the date is valid before formatting
          if (isNaN(date.getTime())) {
            return <span>Invalid Date</span>;
          }

          // Format the date to Indian Standard Time (IST)
          // Options for full date and time, adjust as needed
          const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true, // Use 12-hour clock with AM/PM
            timeZone: "Asia/Kolkata",
          };

          const formattedDate = date.toLocaleString("en-IN", options); // 'en-IN' for Indian locale formatting

          return <span>{formattedDate}</span>;
        } catch (error) {
          console.error("Error formatting date:", error);
          return <span>Error</span>; // Display an error if date parsing fails
        }
      },
      cellClass: "pl-4 text-black ",
      headerClass: "pl-4",
    },
    {
      header: "Total Questions",
      class: "pl-5",
      accessor: "totalQuestions",
      cell: (info) => {
        const totalQuestions = info.row.original.questions?.length || 0;
        return <span>{totalQuestions}</span>;
      },
      cellClass: "pl-4 text-black ",
      headerClass: "pl-4",
    },
    {
      header: "Marks Obtained",
      class: "pl-5",
      accessor: "marksObtained",
      cell: (info) => {
        const { questions = [], answers = [] } = info.row.original;
        const obtainedMarks = answers.reduce((score, answer) => {
          const question = questions.find(
            (q) => q.questionNumber === answer.questionNumber
          );
          
          // If answer is "E" (no answer/skip), don't add or subtract marks
          if (answer.option === "E") {
            return score;
          }
          
          // If answer is correct, add 1 mark
          if (question?.correctAnswer === answer.option) {
            return score + 1;
          }
          
          // If answer is wrong, subtract 1 mark (negative marking)
          return score - 2;
        }, 0);
        return <span className={obtainedMarks >= 0 ? 'text-green-600' : 'text-red-600'}>{obtainedMarks}</span>;
      },
      cellClass: "pl-4 text-black ",
      headerClass: "pl-4",
    },
    {
      header: "Percentage",
      class: "pl-5",
      accessor: "percentage",
      cell: (info) => {
        const { questions = [], answers = [] } = info.row.original;
        const totalMarks = questions.length;
        const obtainedMarks = answers.reduce((score, answer) => {
          const question = questions.find(
            (q) => q.questionNumber === answer.questionNumber
          );
          
          // If answer is "E" (no answer/skip), don't add or subtract marks
          if (answer.option === "E") {
            return score;
          }
          
          // If answer is correct, add 1 mark
          if (question?.correctAnswer === answer.option) {
            return score + 1;
          }
          
          // If answer is wrong, subtract 1 mark (negative marking)
          return score - 2;
        }, 0);
        // Calculate percentage, ensuring it doesn't go below 0
        const percentage =
          totalMarks > 0
            ? Math.max(0, (obtainedMarks / totalMarks) * 100).toFixed(2)
            : "0.00";
        return <span className={obtainedMarks >= 0 ? 'text-green-600' : 'text-red-600'}>{percentage}%</span>;
      },
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
        const userRole = localStorage.getItem("role");
        const updatedRow = {
          ...row,
          original: {
            ...row.original,
            available_actions: {
              view: true,
              update: false,
              delete: userRole === "admin",
            },
          },
        };
        return (
          <ActionCell
            row={updatedRow}
            viewUrl="papers"
            formComponent="addPaper"
            deleteComponent={userRole === "admin" ? "deletePaper" : undefined}
          />
        );
      },
    },
  ];

  const buttons = [
    {
      label: "Generate New Paper",
      icon: <Plus />,
      onClick: () => dispatch(setFormOpen({ sheetComponent: "addPaper" })),
    },
  ];

  return (
    <div>
      <UILayout>
        <h1 className="text-3xl font-semibold m-2 mx-4">{"Paper"}</h1>
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
