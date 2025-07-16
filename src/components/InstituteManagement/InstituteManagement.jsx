import React from "react";

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
  return (
    <section className="mt-10">
      <InstituteManagementTableHead columns={columns} />
    </section>
  );
};

export default InstituteManagement;
