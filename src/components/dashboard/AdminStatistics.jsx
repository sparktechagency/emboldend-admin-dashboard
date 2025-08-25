import { Grid, Skeleton } from 'antd';
import { useGetdashboardStaticticsQuery } from '../../features/dashboard/dashboardApi';

const { useBreakpoint } = Grid;

const AdminStatistics = () => {
  const { data, isLoading } = useGetdashboardStaticticsQuery();
  const screens = useBreakpoint();

  // Determine layout based on screen size
  const isMobile = !screens.md;
  const isTablet = screens.md && !screens.lg;
  const isDesktop = screens.lg;

  return (
    <div className="border border-primary rounded-lg p-3 md:p-4 lg:p-6 mb-4 md:mb-6">
      <div className="w-full rounded-xl flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
          <h2 className="text-xl md:text-2xl font-semibold">Statistics</h2>
          <div className="border border-primary px-2 py-1.5 select-none rounded text-sm md:text-base">
            Last 7 Days
          </div>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
            <div className="border border-primary w-full rounded-xl p-3 md:p-4">
              <div className="font-medium text-lg md:text-xl lg:text-2xl mb-1 md:mb-2">Total Earn</div>
              <div className="text-lg md:text-xl font-bold text-gray-800">
                {isLoading ? (
                  <Skeleton paragraph={{ rows: 0 }} active />
                ) : (
                  `$${data?.data?.totalEarning?.toLocaleString() || 0}`
                )}
              </div>
            </div>

            <div className="border border-primary w-full rounded-xl p-3 md:p-4">
              <div className="font-medium text-lg md:text-xl lg:text-2xl mb-1 md:mb-2">Total Institute</div>
              <div className="text-lg md:text-xl font-bold text-gray-800">
                {isLoading ? (
                  <Skeleton paragraph={{ rows: 0 }} active />
                ) : (
                  data?.data?.totalInstitutions?.toLocaleString() || 0
                )}
              </div>
            </div>
          </div>

          <div className="border border-primary rounded-xl p-3 md:p-4">
            <div className="font-medium text-lg md:text-xl lg:text-2xl mb-1 md:mb-2">Total Subscription Sell</div>
            <div className="text-lg md:text-xl font-bold text-gray-800">
              {isLoading ? (
                <Skeleton paragraph={{ rows: 0 }} active />
              ) : (
                data?.data?.totalSubscriptions?.toLocaleString() || 0
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;