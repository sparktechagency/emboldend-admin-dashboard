import { Spin } from "antd";
import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

const AnalysisCard = lazy(() => import("../../components/AnalysisCard"));
const OrderChart = lazy(() => import("../../components/dashboard/OrderChart"));
const PieCharts = lazy(() => import("../../components/dashboard/PieChart"));
const Revenue = lazy(() => import("../../components/dashboard/Revenue"));
const AdminStatistics = lazy(() => import("../../components/dashboard/AdminStatistics"));
const RecentJoinManagement = lazy(() => import("../../components/RecentJoinManagement/RecentJoinManagement"));

const Dashboard = () => {
  const navigate = useNavigate();

  const analysisCards = [
    {
      value: 32,
      title: "Total Food Sell",
      icon: "/icons/sell.svg",
      percentage: "4% (30 days)",
    },
    {
      value: "$632",
      title: "Total Revenue",
      icon: "/icons/order.svg",
      percentage: "12% (30 days)",
    },
    {
      value: 32,
      title: "Total User",
      icon: "/icons/users.svg",
    },
    {
      value: 34,
      title: "Total Shop",
      icon: "/icons/spot.svg",
    },
  ];

  return (
    <div className="flex flex-col gap-6 md:gap-10 py-6 md:py-10 px-4 md:px-0">
      {/* Revenue and Statistics */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6 md:gap-10">
        <div className="w-full lg:w-8/12">
          <Suspense fallback={<div className="flex justify-center items-center h-80"><Spin /></div>}>
            <Revenue />
          </Suspense>
        </div>

        <div className="w-full lg:w-4/12">
          <Suspense fallback={<div className="flex justify-center items-center h-80"><Spin /></div>}>
            <AdminStatistics />
          </Suspense>
        </div>
      </div>

      {/* Recent Institute Join */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl md:text-2xl font-semibold">Recent Institute Join</h3>
        <div className='p-2 overflow-x-auto'>
          <Suspense fallback={<div className="flex justify-center items-center h-64"><Spin /></div>}>
            <RecentJoinManagement />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;