import ParkingManagementTable from "../../components/ParkingManagementTable";

const ParkingManagement = () => {
  const columns = [
    "SL",
    "Spot Name",
    "Email",
    "Location",
    "Phone Number",
    "Total Parking Sell",
    "Revenue Percentage",
  ];

  return (
    <div className="w-full mt-10">
      <div className="flex flex-col gap-6 ">
        <ParkingManagementTable columns={columns} />
      </div>
    </div>
  );
};

export default ParkingManagement;
