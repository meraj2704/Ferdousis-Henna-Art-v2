import React from "react";
import { SellChart } from "./SellChart";
import DashboardCard from "./DashboardCard";
import { PieChartComp } from "./PieChartComp";
import { DynamicBreadcrumb } from "@/components/share/DynamicBreadCrumb";

const Dashboard = () => {
  const salesData = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 300 },
    { month: "Mar", sales: 500 },
    { month: "Apr", sales: 200 },
    { month: "May", sales: 700 },
    { month: "Jun", sales: 600 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <DynamicBreadcrumb items={[{ label: "Dashboard" }]} />
      </div>
      {/* Sales Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          cardName="Total Sales"
          number={"12345"}
          content="Compared to the last month"
        />
        <DashboardCard
          cardName="Products Sold"
          number={"12345"}
          content="Compared to the last month"
        />
        <DashboardCard
          cardName="New Customer"
          number={"12345"}
          content="Compared to the last month"
        />
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <PieChartComp />
        <SellChart />
      </div>
    </div>
  );
};

export default Dashboard;
