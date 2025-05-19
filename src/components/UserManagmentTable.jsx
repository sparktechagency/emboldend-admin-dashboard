import React, { useEffect, useState } from "react";
import UserManagementTableRow from "./UserManagementTableRow";
import { useGetUserManagementQuery } from "../features/userManagement/userManagementApi";
import CustomLoading from "./CustomLoading";
import { useLocation, useNavigate } from "react-router-dom";


const userdata = [
  {
    name: "John",
    status:"Active",
    email:"example@email.com",
    location:"Demo Location",
    phone:"12345-678901",
    join:"01-02-2025",
    reservation:"yes"
  },
  {
    name: "John",
    status:"Active",
    email:"example@email.com",
    location:"Demo Location",
    phone:"12345-678901",
    join:"01-02-2025",
    reservation:"yes"
  },
  {
    name: "John",
    status:"Active",
    email:"example@email.com",
    location:"Demo Location",
    phone:"12345-678901",
    join:"01-02-2025",
    reservation:"yes"
  },
  {
    name: "John",
    status:"Active",
    email:"example@email.com",
    location:"Demo Location",
    phone:"12345-678901",
    join:"01-02-2025",
    reservation:"yes"
  }
]

const Table = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = parseInt(queryParams.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(pageParam);
  const [isFetching, setIsFetching] = useState(false);

  const { data: users, isLoading } = useGetUserManagementQuery(currentPage, { refetchOnFocus: true, refetchOnReconnect: true });

  const totalPage = users?.pagination?.totalPage || 1;

  useEffect(() => {
    setIsFetching(true);
    navigate(`?page=${currentPage}`, { replace: true });

    const timer = setTimeout(() => {
      setIsFetching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentPage, navigate]);

  return (
    <main className="overflow-x-auto">
      <section className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        {/* Header section */}
        <div className="grid grid-cols-8 text-center border-2 border-opacity-50 rounded-lg justify-items-stretch bg-surfacePrimary border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 text-sm font-semibold">
              {column}
            </div>
          ))}
        </div>

        {/* Body section */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {isLoading || isFetching ? (
            <CustomLoading />
          ) : userdata?.length > 0 ? (
            userdata?.map((item, i) => (
              <UserManagementTableRow item={item} key={i} list={i + 1} />
            ))
          ) : (
            <h3 className="py-10 text-center">No Data Available</h3>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <button
            className={`px-4 py-2 mx-1 border rounded ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            disabled={currentPage === 1 || isFetching}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Prev
          </button>

          {Array.from({ length: totalPage }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 border rounded ${
                currentPage === index + 1
                  ? "bg-primary text-white"
                  : "hover:bg-gray-200"
              } ${isFetching ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => !isFetching && setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`px-4 py-2 mx-1 border rounded ${
              currentPage === totalPage
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            disabled={currentPage === totalPage || isFetching}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPage))
            }
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
};

export default Table;
