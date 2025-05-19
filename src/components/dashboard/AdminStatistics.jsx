
const AdminStatistics = () => {
  return (
    <div className="border h-[405px] flex flex-col justify-center border-primary rounded-lg p-3">
      <div className="w-full rounded-xl flex flex-col  gap-6">
        <div className="flex  justify-between items-center">
          <h2 className="text-2xl font-semibold">Statistics</h2>
          <h3 className='border border-primary px-2 py-1.5 select-none rounded'>Last 7 Days</h3>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="border border-primary w-full rounded-xl p-4 ">
              <div className=" font-medium text-2xl mb-2">Total Earn</div>
              <div className="text-xl font-bold text-gray-800">$27,000</div>
            </div>

            <div className="border border-primary w-full rounded-xl p-4 ">
              <div className=" font-medium text-2xl mb-2">Total Institute</div>
              <div className="text-xl font-bold text-gray-800">50</div>
            </div>
          </div>

          <div className="border border-primary rounded-xl p-4 ">
            <div className=" font-medium text-2xl mb-2">Total Subscription Sell </div>
            <div className="text-xl font-bold text-gray-800">30</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;