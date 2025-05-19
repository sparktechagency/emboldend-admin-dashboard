import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetEarningQuery } from "../features/earning/earningApi";
import CustomFilterDropdown from "./CustomFilterDropdown";
import CustomLoading from "./CustomLoading";
import EarningTableRow from "./EarningTableRow";

const EarningTable = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search") || "";

  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(Number(queryParams.get("page")) || 1);
  const { data: earningData, isLoading } = useGetEarningQuery(currentPage, { refetchOnFocus: true, refetchOnReconnect: true });

  const totalPages = earningData?.data?.pagination?.totalPage || 1;

  // Update URL when page changes
  useEffect(() => {
    setIsFetching(true);
    queryParams.set("page", currentPage);
    navigate(`?${queryParams.toString()}`, { replace: true });

    const timer = setTimeout(() => setIsFetching(false), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, navigate]);

  // Filter orders based on search value
  const filteredOrders = useMemo(() => {
    const earnings = earningData?.data?.earning?.slice().reverse() || [];

    if (!searchValue) {
      return earnings;
    }

    const lowerCaseSearch = searchValue.toLowerCase();

    return earnings.filter(earning => {
      // Adjust these properties based on your actual data structure
      return (
        (earning.orderNumber && earning.orderNumber.toLowerCase().includes(lowerCaseSearch)));
    });
  }, [earningData, searchValue]);

  // Debounce search handling
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value) => {
      queryParams.set("search", value);
      if (value === "") {
        queryParams.delete("search");
      }
      queryParams.set("page", "1"); // Reset to first page when searching
      navigate(`?${queryParams.toString()}`, { replace: true });
    }, 500),
    [navigate]
  );

  // Handle search input changes


  // Handle page changes
  const handlePageChange = (newPage) => {
    if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Function to generate pagination buttons dynamically
  const renderPaginationButtons = () => {
    const pages = [];
    const maxButtons = 5; // Number of pages to display in pagination

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



  const data = [
    {
      id: 1,
      ownerName: "John joe",
      email: "example@email.com",
      phoneNumber: "12345-678901",
      subscription: "Yes",
      planChoose: "Day",
      amount: "60",
      transection: "12344567894123",
      startDate: "April 25, 2025",
      endDate: "May 25, 2025",
      status: "active",
    },
    {
      id: 2,
      ownerName: "John joe",
      email: "example@email.com",
      phoneNumber: "12345-678901",
      subscription: "Yes",
      planChoose: "Day",
      amount: "60",
      transection: "12344567894123",
      startDate: "April 25, 2025",
      endDate: "May 25, 2025",
      status: "active",
    },
    {
      id: 3,
      ownerName: "John joe",
      email: "example@email.com",
      phoneNumber: "12345-678901",
      subscription: "Yes",
      planChoose: "Day",
      amount: "60",
      transection: "12344567894123",
      startDate: "April 25, 2025",
      endDate: "May 25, 2025",
      status: "active",
    },
    {
      id: 4,
      ownerName: "John joe",
      email: "example@email.com",
      phoneNumber: "12345-678901",
      subscription: "Yes",
      planChoose: "Day",
      amount: "60",
      transection: "12344567894123",
      startDate: "April 25, 2025",
      endDate: "May 25, 2025",
      status: "active",
    },
  
  ]


  const filter =  [
    { label: 'All', value: 'all' },
    { label: '7 Day Free Trial', value: 'FreeTrial' }, 
    { label: '1 Month', value: '1Month' },
    { label: '6 Month', value: '6Month' },
    { label: '1 Year', value: '1Year' },
  ]






  return (
    <div className="overflow-x-auto">
      {/* Search input */}


      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
          <div className=" flex justify-between">
            <h3 className="w-10/12"></h3>
            <div className="w-2/12"><CustomFilterDropdown options={filter} onChange={(value) => console.log(value)} /></div>
          </div>
        
        {/* Header */}
        <div className="grid grid-cols-11 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">{column}</div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {
            data.map((item, i) => (
              <EarningTableRow item={item} key={i} />
            ))
          }
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <button
            className={`px-4 py-2 mx-1 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
            disabled={currentPage === 1 || isFetching}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>

          {renderPaginationButtons().map((button, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 border rounded ${button === currentPage ? "bg-primary text-white" : "hover:bg-gray-200"} ${isFetching ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => {
                if (button !== "...") handlePageChange(button);
              }}
              disabled={isFetching || button === "..."}
            >
              {button}
            </button>
          ))}

          <button
            className={`px-4 py-2 mx-1 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
            disabled={currentPage === totalPages || isFetching}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EarningTable;