import { useLocation } from "react-router-dom";

import OwnerTableBody from "./OwnerTableBody";
import CustomFilterDropdown from "../../CustomFilterDropdown";

const OwnerTableHead = ({ columns }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search") || "";

  const data = [
    {
      id: 1,
      instituteName: "Brookwood Baptist Health",
      location: "500 N. Eastern Blvd. Montgomery, AL 36117.",
      email: "example@email.com",
      appUser: "20",
      phoneNumber: "12345-678901",
      created: "April 25,2025",
      status: "active",
    },
     {
      id: 2,
      instituteName: "Brookwood Baptist Health",
      location: "500 N. Eastern Blvd. Montgomery, AL 36117.",
      email: "example@email.com",
      appUser: "20",
      phoneNumber: "12345-678901",
      created: "April 25,2025",
      status: "active",
    },
     {
      id: 3,
      instituteName: "Brookwood Baptist Health",
      location: "500 N. Eastern Blvd. Montgomery, AL 36117.",
      email: "example@email.com",
      appUser: "20",
      phoneNumber: "12345-678901",
      created: "April 25,2025",
      status: "active",
    },
     {
      id: 4,
      instituteName: "Brookwood Baptist Health",
      location: "500 N. Eastern Blvd. Montgomery, AL 36117.",
      email: "example@email.com",
      appUser: "20",
      phoneNumber: "12345-678901",
      created: "April 25,2025",
      status: "active",
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
        
        {/* Header */}
        <div className="grid grid-cols-10 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">{column}</div>
          ))}
          <div className="col-span-2 py-3 font-semibold">Action</div>
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {data && data.length > 0 ? (
            data.map((item, i) => (
              <OwnerTableBody item={item} key={i} />
            ))
          ) : (
            <h3 className="py-10 text-center">No Data Available</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerTableHead;