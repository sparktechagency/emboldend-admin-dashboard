import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetEarningQuery } from "../features/earning/earningApi";
import CustomFilterDropdown from "./CustomFilterDropdown";
import EarningTableRow from "./EarningTableRow";

const EarningTable = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search") || "";
  const statusFilter = queryParams.get("status") || "";


  console.log(searchValue)

  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(Number(queryParams.get("page")) || 1);

  // Use the API query with page, status, and search parameters
  const { data: earningData, isLoading, refetch } = useGetEarningQuery(
    {
      page: currentPage,
      status: statusFilter === 'all' ? '' : statusFilter,
      search: searchValue
    },
    {
      refetchOnFocus: true,
      refetchOnReconnect: true
    }
  );

  const totalPages = earningData?.data?.meta?.totalPage || 1;
  const earnings = earningData?.data?.data || [];

  // Update URL when page, filter, or search changes
  useEffect(() => {
    setIsFetching(true);
    const newParams = new URLSearchParams();

    newParams.set("page", currentPage);

    if (statusFilter && statusFilter !== 'all') {
      newParams.set("status", statusFilter);
    }

    if (searchValue) {
      newParams.set("search", searchValue);
    }

    navigate(`?${newParams.toString()}`, { replace: true });

    const timer = setTimeout(() => setIsFetching(false), 300);
    return () => clearTimeout(timer);
  }, [currentPage, statusFilter, searchValue, navigate]);

  // Debounce search handling
  const debouncedSearch = useCallback(
    debounce((value) => {
      const newParams = new URLSearchParams(location.search);

      if (value.trim()) {
        newParams.set("search", value);
      } else {
        newParams.delete("search");
      }

      newParams.set("page", "1");
      setCurrentPage(1);
      navigate(`?${newParams.toString()}`, { replace: true });
    }, 500),
    [navigate, location.search]
  );

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  // Handle page changes
  const handlePageChange = (newPage) => {
    if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle status filter change
  const handleStatusFilter = (value) => {
    setCurrentPage(1);
    const newParams = new URLSearchParams(location.search);

    if (value === "all" || value === '') {
      newParams.delete("status");
    } else {
      newParams.set("status", value);
    }

    newParams.set("page", "1");
    navigate(`?${newParams.toString()}`, { replace: true });
  };

  // Function to generate pagination buttons dynamically
  const renderPaginationButtons = () => {
    const pages = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 3) pages.push(1, "...");

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...", totalPages);
    }

    return pages;
  };

  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'CANCELLED', value: 'CANCELLED' },
    { label: 'INACTIVE', value: 'INACTIVE' },
    { label: 'EXPIRED', value: 'EXPIRED' },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        <div className="flex justify-between items-center gap-4">
          {/* Search Input */}
          <div className="w-10/12">

          </div>

          {/* Filter Dropdown */}
          <div className="w-2/12">
            <CustomFilterDropdown
              options={filterOptions}
              onChange={handleStatusFilter}
              defaultValue={statusFilter || 'all'}
            />
          </div>
        </div>
        {/* Header */}
        <div className="grid grid-cols-11 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">{column}</div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                <span>Loading data...</span>
              </div>
            </div>
          ) : earnings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="text-gray-500 text-center">
                {searchValue || statusFilter ? (
                  <>
                    <p className="text-lg font-medium mb-2">No matching results found</p>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-medium mb-2">No data available</p>
                    <p className="text-sm">There are no earnings records to display</p>
                  </>
                )}
              </div>
            </div>
          ) : (
            earnings.map((earning, i) => (
              <EarningTableRow
                key={earning._id}
                item={{
                  id: (currentPage - 1) * (earningData?.data?.meta?.limit || 10) + i + 1,
                  _id: earning._id,
                  ownerName: earning.userId?.name || 'N/A',
                  email: earning.userId?.email || 'N/A',
                  phoneNumber: earning.userId?.phone || 'N/A',
                  subscription: "Yes",
                  planChoose: earning.packageId?.planName || 'N/A',
                  amount: earning.price || 0,
                  transection: earning.trxId || 'N/A',
                  startDate: earning.currentPeriodStart || 'N/A',
                  endDate: earning.currentPeriodEnd || 'N/A',
                  status: earning.status || 'N/A',
                }}
                isFetching={isFetching}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 space-x-2">
            <button
              className={`px-4 py-2 border rounded-lg transition-colors ${currentPage === 1
                ? "opacity-50 cursor-not-allowed bg-gray-100"
                : "hover:bg-gray-200 bg-white"
                }`}
              disabled={currentPage === 1 || isFetching}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>

            <div className="flex space-x-1">
              {renderPaginationButtons().map((button, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border rounded-lg transition-colors ${button === currentPage
                    ? "bg-primary text-white border-primary"
                    : button === "..."
                      ? "cursor-default bg-gray-100"
                      : "hover:bg-gray-200 bg-white"
                    } ${isFetching ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => {
                    if (button !== "..." && !isFetching) handlePageChange(button);
                  }}
                  disabled={isFetching || button === "..."}
                >
                  {button}
                </button>
              ))}
            </div>

            <button
              className={`px-4 py-2 border rounded-lg transition-colors ${currentPage === totalPages
                ? "opacity-50 cursor-not-allowed bg-gray-100"
                : "hover:bg-gray-200 bg-white"
                }`}
              disabled={currentPage === totalPages || isFetching}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default EarningTable;