"use client";
import React from "react";
import { SellChart } from "./SellChart";
import DashboardCard from "./DashboardCard";
import { PieChartComp } from "./PieChartComp";
import { DynamicBreadcrumb } from "@/components/share/DynamicBreadCrumb";
import { useFetchData } from "@/hooks/useApi";

const Dashboard = () => {
  const { data, isLoading, error } = useFetchData(["dashboard"], "dashboard");
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
          cardName="Pending Orders"
          number={data?.orderStatusCounts?.pending}
          content="Counted by order status"
        />
        <DashboardCard
          cardName="Delivered Orders"
          number={data?.orderStatusCounts?.delivered}
          content="Counted by order status"
        />
        <DashboardCard
          cardName="Canceled Orders"
          number={data?.orderStatusCounts?.canceled}
          content="Counted by order status"
        />

        <DashboardCard
          cardName="Total Sales"
          number={`${data?.totalSaleAmount || 0} TK.`}
          content="All sales are counted."
        />
        <DashboardCard
          cardName="Running Month Sales"
          number={`${data?.monthlySales?.monthlySaleAmount || 0} TK.`}
          content="Running month sales are counted."
        />
        <DashboardCard
          cardName="Products Sold"
          number={data?.totalSaleQuantity || 0}
          content="All sold are counted."
        />
        <DashboardCard
          cardName="Running Month Products Sold"
          number={`${data?.monthlySales?.monthlySaleQuantity || 0}`}
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
        <PieChartComp
          chartData={data?.productSales}
          totalSale={data?.totalSaleQuantity}
        />
        <SellChart chartData={data?.chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
