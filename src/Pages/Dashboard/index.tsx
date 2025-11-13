import UIBreadcrumb from "@/UI/Elements/Breadcrumb";
import UILayout from "@/UI/Elements/Layout";
import Chart1 from "./chart1";
import Chart2 from "./chart2";
import Chart3 from "./chart3";

const Dashboard = () => {
  const breadcrumb = [
    { name: "home", path: "/", color: true },
    {
      name: "dashboard",
      url: "#",
      color: false,
    },
  ];

  return (
    <UILayout>
      <div className="p-6">
        <UIBreadcrumb breadcrumbs={breadcrumb} />
        <div className="text-2xl font-bold  pb-1 pt-5 rtl:pr-8">
          <h1 className="pl-5 text-3xl font-semibold p-2">{"dashboard"}</h1>
        </div>
        <div className="text-2xl font-bold  pb-1 pt-5">
          <div className="flex">
            <div className="">
              <Chart1 />
            </div>
            <div className="ml-4">
              <Chart2 />
            </div>
           
          </div>
          <div className="mt-10">
              <Chart3 />
            </div>
        </div>
      </div>
    </UILayout>
  );
};

export default Dashboard;
