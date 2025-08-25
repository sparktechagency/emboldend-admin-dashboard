import { useState } from "react";

import CustomFilterDropdown from '../CustomFilterDropdown';
import InstituteManagementTableHead from "./InstituteManagementTableHead";

const columns = [
  "SL",
  "Owner Name",
  "Email",
  "Phone Number",
  "Total Institute",
  "Total App User",
  "Subscription",
  "Plan Running",
  "Status"
];

const InstituteManagement = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const statusOptions = [
    { label: 'All', value: '' },
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' },
  ];

  return (

    <section className="sm:mt-10 mt-2">
      <div className="flex justify-end w-full">
        <div className="flex items-center gap-2 sm:w-2/12 w-5/12">
          <CustomFilterDropdown
            options={statusOptions}
            value={statusFilter}
            onChange={(value) => {
              setStatusFilter(value);
            }}
          />
        </div>
      </div>
      <div className='mt-4'>
        <InstituteManagementTableHead columns={columns} statusFilter={statusFilter} />
      </div>
    </section>
  );
};

export default InstituteManagement;
