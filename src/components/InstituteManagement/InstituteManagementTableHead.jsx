import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetInstituteQuery } from '../../features/instituteManagement/instituteManagementApi';
import CustomFilterDropdown from '../CustomFilterDropdown';

import { Spin } from 'antd';
import Pagination from '../Pagination';
import InstituteManagementTableBody from './InstituteManagementTableBody';

const InstituteManagementTableHead = ({ columns }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get('search') || '';

  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: response, isLoading, isError, refetch } = useGetInstituteQuery({
    searchTerm: searchValue,
    status: statusFilter,
    page: currentPage,
  });

  const institutes = response?.data?.data || [];
  const pagination = response?.data?.meta || {
    total: 0,
    limit: 10,
    page: 1,
    totalPage: 1,
  };

  const statusOptions = [
    { label: 'All', value: '' },
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isError) return <div className="text-red-500 text-center py-10">Error loading data</div>;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        <div className="flex justify-end w-full">
          <div className="flex items-center gap-2 w-2/12">
            <CustomFilterDropdown
              options={statusOptions}
              value={statusFilter}
              onChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Header */}
        <div className="grid grid-cols-11 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">
              {column}
            </div>
          ))}
          <div className="col-span-2 py-3 font-semibold">Action</div>
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {
            isLoading ? <div className='h-[200px] flex items-center justify-center'><Spin size='small' /></div> : institutes.length > 0 ? (
              institutes.map((item) => <InstituteManagementTableBody item={item} key={item._id} refetch={refetch} />)
            ) : (
              <h3 className="py-10 text-center">No Data Available</h3>
            )}

        </div>

        {/* Pagination */}
        <div className='flex justify-end items-center'>
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default InstituteManagementTableHead;