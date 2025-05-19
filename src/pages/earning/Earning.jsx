import React from "react";

import EarningTable from "../../components/EarningTable";

const columns = [
  "SL",
  "Owner Name",
  "Email",
  "Phone Number",
  "Subscription",
  "Plan Choose",
  "Amount",
  "Transection ID",
  "Start Date",
  "End Date",
  "status"
];

const Earning = () => {
  return (
    <section className="mt-10">
      <EarningTable columns={columns} />
    </section>
  );
};

export default Earning;
