import { useLocation } from "react-router-dom";
import CustomFilterDropdown from "../CustomFilterDropdown";
import InstituteManagementTableBody from "./InstituteManagementTableBody";

const InstituteManagementTableHead = ({ columns }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search") || "";

  const data = [
    {
      id: 1,
      ownerName: "John joe",
      email: "example@email.com",
      phoneNumber: "12345-678901",
      totalInstitute: "5",
      totalAppUser: "30",
      subscription: "Yes",
      planRunning: "1 Month",
      status: "active",
      paid: true,
      adminRevenue: 10,
      parkingSlot: 4
    },
    {
      id: 2,
      ownerName: "John joe",
      email: "example@email.com",
      phoneNumber: "12345-678901",
      totalInstitute: "5",
      totalAppUser: "30",
      subscription: "Yes",
      planRunning: "1 Month",
      status: "active",
      paid: true,
      adminRevenue: 10,
      parkingSlot: 4
    },
    {
      id: 3,
      ownerName: "John joe",
      email: "example@email.com",
      phoneNumber: "12345-678901",
      totalInstitute: "5",
      totalAppUser: "30",
      subscription: "Yes",
      planRunning: "1 Month",
      status: "active",
      paid: true,
      adminRevenue: 10,
      parkingSlot: 4
    },
    {
      id: 4,
      ownerName: "John joe",
      email: "example@email.com",
      phoneNumber: "12345-678901",
      totalInstitute: "5",
      totalAppUser: "30",
      subscription: "Yes",
      planRunning: "1 Month",
      status: "active",
      paid: true,
      adminRevenue: 10,
      parkingSlot: 4
    },

  ];

  const options = [
    { label: 'All', value: 'all' },
    { label: 'Office', value: 'office' },
    { label: 'Government', value: 'government' }
  ];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        <div className="flex justify-end w-full">
          <div className="flex items-center gap-2 w-3/12">
            <CustomFilterDropdown options={options} />
            <CustomFilterDropdown options={options} />
          </div>
        </div>

        {/* Header */}
        <div className="grid grid-cols-11 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">{column}</div>
          ))}
          <div className="col-span-2 py-3 font-semibold">Action</div>
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {data && data.length > 0 ? (
            data.map((item, i) => (
              <InstituteManagementTableBody item={item} key={i} />
            ))
          ) : (
            <h3 className="py-10 text-center">No Data Available</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstituteManagementTableHead;