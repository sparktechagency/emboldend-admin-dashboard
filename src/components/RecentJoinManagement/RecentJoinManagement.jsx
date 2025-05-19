import RecentJoinTableHead from "./RecentJoinTableHead";

const columns = [
  "SL",
  "Owner Name",
  "Email",
  "Phone Number",
  "Joining Date",
  "Subscription",
  "Plan Running",
  "Status",
];

const RecentJoinManagement = () => {
  return (
    <section className="">
      <RecentJoinTableHead columns={columns} />
    </section>
  );
};

export default RecentJoinManagement;
