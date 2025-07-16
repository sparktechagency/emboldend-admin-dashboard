// RecentJoinTableHead.jsx
import { useState } from 'react';
import { useGetRecentInstituteQuery } from '../../features/dashboard/dashboardApi';
import RecentJoinTableBody from "./RecentJoinTableBody";

const RecentJoinTableHead = ({ columns }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: recentInstiteJoin, isLoading } = useGetRecentInstituteQuery({ page: currentPage, limit: 5 });
  
  const institutions = recentInstiteJoin?.data?.data || [];
  const meta = recentInstiteJoin?.data?.meta || {};

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        {/* Header */}
        <div className="grid grid-cols-8 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">{column}</div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <p>Loading institutions...</p>
            </div>
          ) : institutions.length > 0 ? (
            <>
              {institutions.map((item, i) => (
                <RecentJoinTableBody 
                  item={{
                    id: i + 1 + ((currentPage - 1) * 5),
                    ownerName: item.institutionName,
                    email: item.email,
                    phoneNumber: item.phoneNumber,
                    joiningDate: new Date(item.createdAt).toLocaleDateString("en-GB"),
                    subscription: "No", // You might want to get this from API
                    planRunning: "60",   // You might want to get this from API
                    status: item.status
                  }} 
                  key={item._id} 
                />
              ))}
            </>
          ) : (
            <div className="flex items-center justify-center py-10">
              <p>No institutions found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {meta.totalPage > 1 && (
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-primary text-white' : 'bg-gray-200'}`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentJoinTableHead;