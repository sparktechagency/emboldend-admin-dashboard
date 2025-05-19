import { Card, Dropdown, message, Radio } from "antd";
import { useEffect, useState } from "react";
import { useUpdateUserManagementMutation } from "../features/userManagement/userManagementApi";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const UsermanagementTableRow = ({ item, list }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [updateUserManagement, { isLoading: isLoadingStatus }] =
    useUpdateUserManagementMutation(undefined, {
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });

    const [statusName, setStatusName] = useState(item?.status);

    useEffect(() => {
      if (item?.status) {
        setStatusName(item.status);
      }
    }, [item?.status]);


  // Update statusName whenever item.status changes
  useEffect(() => {
    setStatusName(item.status);
  }, [item.status]);

  const handleRadioChange = async (e) => {
      const newStatus = e?.target?.value;
      setStatusName(newStatus);
      setDropdownOpen(false);
  };

  return (
    <div className="grid grid-cols-8 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap">
      <div className="py-3 text-center">{list}</div>
      <div className="px-3 py-3 text-center">{item?.name}</div>
      <div className="px-3 py-3 text-center">{item.email}</div>
      <div className="px-4 py-3 text-center">{"Dhaka"}</div>
      <div className="px-4 py-3 text-center">{item.phone}</div>
      <div className="px-4 py-3 text-center">
        {new Date(item.updatedAt).toLocaleDateString("en-GB")}
      </div>
      <div className="py-3 text-center">
        {item?.orders === true ? "Yes" : "No"}
      </div>

      <div className="text-center">
  <Dropdown
    open={dropdownOpen}
    onOpenChange={setDropdownOpen}
    trigger={["click"]}
    disabled={item.userStatus === "blocked"}
    dropdownRender={() => (
      <Card className="shadow-lg w-38">
        <Radio.Group
          onChange={handleRadioChange}
          value={statusName}
          disabled={isLoadingStatus}
          className="flex flex-col space-y-2"
        >
          <Radio value="Active" className="font-semibold text-primary">
            Active
          </Radio>
          <Radio value="Blocked" className="text-black">
            Blocked
          </Radio>
        </Radio.Group>
      </Card>
    )}
    placement="bottomRight"
  >
    <div className="flex justify-center py-1 text-center transition duration-200 border border-red-500 rounded hover:bg-gray-100">
      <button
        className={`w-[180px] p-2.5 text-white rounded flex items-center justify-center ${
          statusName === "Blocked" ? "bg-red-600" : "bg-primary"
        }`}
      >
        <span>{statusName}</span>
        {dropdownOpen ? (
          <BiChevronUp size={20} className="ml-2" />
        ) : (
          <BiChevronDown size={20} className="ml-2" />
        )}
      </button>
    </div>
  </Dropdown>
</div>
    </div>
  );
};

export default UsermanagementTableRow;
