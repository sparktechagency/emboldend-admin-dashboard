import { Pagination } from "antd";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetInstituteByOwnerIdQuery } from '../../../features/instituteManagement/instituteManagementApi';
import CustomFilterDropdown from "../../CustomFilterDropdown";
import OwnerTableBody from "./OwnerTableBody";

const OwnerTableHead = ({ columns }) => {
  const ownerId = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  const { data: institutes, isLoading, isError } = useGetInstituteByOwnerIdQuery({
    id: ownerId?.id,
    page: currentPage,
    status: statusFilter
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const statusOptions = [
    { label: 'All', value: '' },
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' }
  ];

  if (isLoading) return <div className="py-10 text-center">Loading...</div>;
  if (isError) return <div className="py-10 text-center">Error loading data</div>;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        {/* Filter Section */}
        <div className="flex justify-end">
          <div className='w-10/12'>

          </div>

          <div className='w-2/12'>
            <CustomFilterDropdown
              options={statusOptions}
              value={statusFilter}
              onChange={handleStatusFilterChange}
              placeholder="Filter by status"
            />
          </div>
        </div>

        {/* Header */}
        <div className="grid grid-cols-10 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">{column}</div>
          ))}
          <div className="col-span-2 py-3 font-semibold">Action</div>
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {institutes?.data?.data?.length > 0 ? (
            institutes.data.data.map((item, i) => (
              <OwnerTableBody
                item={{
                  id: i + 1 + (currentPage - 1) * 10,
                  instituteName: item.institutionName,
                  location: item.address,
                  email: item.email,
                  appUser: item.totalUsers,
                  phoneNumber: item.phoneNumber,
                  created: new Date(item.createdAt).toLocaleDateString(),
                  status: item.status.toLowerCase(),
                  _id: item._id,
                  address: item.address,
                  website: item.institutionWebsiteLink,
                  logo: item.logo,
                  establishedYear: item.establishedYear
                }}
                key={item._id}
              />
            ))
          ) : (
            <h3 className="py-10 text-center">No Data Available</h3>
          )}
        </div>

        {/* Pagination */}
        {institutes?.data?.meta?.totalPage > 1 && (
          <div className="flex justify-center mt-4">
            <Pagination
              current={currentPage}
              total={institutes.data.meta.total}
              pageSize={institutes.data.meta.limit}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerTableHead;