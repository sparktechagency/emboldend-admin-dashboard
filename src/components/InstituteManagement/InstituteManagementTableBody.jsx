import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Card, Dropdown, Radio } from "antd";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const InstituteManagementTableBody = ({ item }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const router = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);



  const showViewModal = () => {
    setIsViewModalOpen(true);
  };

  const handleModalClose = () => {
    setIsViewModalOpen(false);
  };



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
    <>
      {/* Table Row */}
      <div className="grid items-center grid-cols-11 gap-2 px-2 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap">
        <div className="flex items-center justify-center py-3">{item.id}</div>
        <div className="flex items-center justify-center py-3">{item.ownerName}</div>
        <div className="flex items-center justify-center py-3">{item.email}</div>
        <div className="flex items-center justify-center py-3">{item.phoneNumber}</div>
        <div className="flex items-center justify-center py-3">{item.totalInstitute}</div>
        <div className="flex items-center justify-center py-3">{item.totalAppUser}</div>
        <div className="flex items-center justify-center py-3">
          <span className={`px-3 py-1 rounded-full ${item.subscription === "Yes"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
            }`}>
            {item.subscription}
          </span>
        </div>
        <div className="flex items-center justify-center py-3">{item.planRunning}</div>
        <div className="flex items-center justify-center py-3">
          <span className={`px-3 py-1 rounded-full ${item.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
            }`}>
            {item.status}
          </span>
        </div>

        <div className="flex items-center justify-center col-span-2 gap-2 px-1.5 py-1 border rounded border-SurfacePrimary">
          <button
            onClick={() => router(`/institute-management/owner-details/${item.id}`)}
            className="w-full p-2 text-white transition duration-200 rounded bg-primary hover:bg-primary-dark"
          >
            View Details
          </button>
          <div className="w-full">
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
              <div className="flex justify-center py-1 text-center transition duration-200 rounded hover:bg-gray-100">
                <button
                  className={` px-6 p-2 text-white rounded flex items-center justify-center ${statusName === "Blocked" ? "bg-red-600" : "bg-primary"
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
      </div>

      {/* Institute Details Modal */}
      <AnimatePresence>
        {isViewModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleModalClose}
                className="absolute text-gray-500 top-3 right-3 hover:text-gray-800"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>

              <h2 className="mb-4 text-xl font-bold text-center text-primary">Institute Details</h2>

              <div className="px-3 py-4 space-y-3 border rounded-md border-primary">
                {/* Owner Information Section */}
                <div>
                  <h3 className="mb-2 text-base font-semibold text-primary">Owner Information</h3>
                  <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md">
                    <p className="text-sm"><span className="font-medium">ID:</span> {item.id}</p>
                    <p className="text-sm"><span className="font-medium">Name:</span> {item.ownerName}</p>
                    <p className="text-sm"><span className="font-medium">Email:</span> {item.email}</p>
                    <p className="text-sm"><span className="font-medium">Phone:</span> {item.phoneNumber}</p>
                  </div>
                </div>

                {/* Institute Details Section */}
                <div>
                  <h3 className="mb-2 text-base font-semibold text-primary">Institute Details</h3>
                  <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md">
                    <p className="text-sm"><span className="font-medium">Total Institutes:</span> {item.totalInstitute}</p>
                    <p className="text-sm"><span className="font-medium">Total App Users:</span> {item.totalAppUser}</p>
                    <p className="text-sm"><span className="font-medium">Subscription:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full ${item.subscription === "Yes"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                        }`}>
                        {item.subscription}
                      </span>
                    </p>
                    <p className="text-sm"><span className="font-medium">Current Plan:</span> {item.planRunning}</p>
                  </div>
                </div>

                {/* Status and Revenue Section */}
                <div>
                  <h3 className="mb-2 text-base font-semibold text-primary">Status & Revenue</h3>
                  <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md">
                    <p className="text-sm"><span className="font-medium">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full ${item.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                        }`}>
                        {item.status}
                      </span>
                    </p>
                    <p className="text-sm"><span className="font-medium">Admin Revenue:</span> ${item.adminRevenue}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InstituteManagementTableBody;