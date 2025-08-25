import { Card, Dropdown, Radio, Tooltip } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import { useGetInstitutionByIDQuery, useUpdateInstitutionStatusByIDMutation } from '../../../features/instituteManagement/instituteManagementApi';
import { baseURL } from '../../../utils/BaseURL';

const InstituteTableBody = ({ item }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [updateStatus] = useUpdateInstitutionStatusByIDMutation();

  // Fetch institution details only when modal is opened
  const { data: institutionDetails, isLoading: detailsLoading } = useGetInstitutionByIDQuery(item._id, {
    skip: !isViewModalOpen
  });

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

  const handleRadioChange = async (e) => {
    const newStatus = e.target.value.toUpperCase();
    console.log(newStatus)
    try {
      const result = await updateStatus({
        id: item._id,
        data: { status: newStatus }
      }).unwrap();

      console.log(result);
      setStatusName(newStatus.toLowerCase());
      setDropdownOpen(false);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // Combine props data with fetched details
  const modalData = {
    ...item,
    ...(institutionDetails?.data || {})
  };

  return (
    <>
      {/* Table Row */}
      <div className="grid items-center grid-cols-10 gap-2 px-2 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap">
        <div className="flex items-center justify-center py-3">{item.id}</div>
        <div className="flex items-center justify-center py-3">
          {item.instituteName.split(' ').slice(0, 2).join(' ')}
        </div>
        {/* <div className="flex items-center justify-center py-3">{item.location}</div> */}

        <div className="flex items-center justify-center py-3">
          <Tooltip placement="topLeft" title={item.location}>
            {item.location.length > 10 ? `${item.location.substring(0, 10)}...` : item.location}
          </Tooltip>
        </div>

        <div className="flex items-center justify-center py-3">
          <Tooltip placement="topLeft" title={item.email}>
            {item.email.length > 10 ? `${item.email.substring(0, 10)}...` : item.email}
          </Tooltip>
        </div>


        <div className="flex items-center justify-center py-3">{item.appUser}</div>
        <div className="flex items-center justify-center py-3">{item.phoneNumber}</div>
        <div className="flex items-center justify-center py-3">{item.created}</div>
        <div className="flex items-center justify-center py-3">
          <span className={`px-3 py-1 rounded-full ${statusName === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
            {statusName}
          </span>
        </div>

        <div className="flex items-center justify-center col-span-2 gap-2 px-1.5 py-1 border rounded border-SurfacePrimary">
          <button
            onClick={showViewModal}
            className="w-full p-2 text-white transition duration-200 rounded bg-primary hover:bg-primary-dark"
          >
            View Details
          </button>
          <div className="w-full">
            <Dropdown
              open={dropdownOpen}
              onOpenChange={setDropdownOpen}
              trigger={["click"]}
              dropdownRender={() => (
                <Card className="shadow-lg w-38">
                  <Radio.Group
                    onChange={handleRadioChange}
                    value={statusName}
                    className="flex flex-col space-y-2"
                  >
                    <Radio value="active" className="font-semibold text-primary">
                      Active
                    </Radio>
                    <Radio value="inactive" className="text-black">
                      Inactive
                    </Radio>
                  </Radio.Group>
                </Card>
              )}
              placement="bottomRight"
            >
              <div className="flex justify-center py-1 text-center transition duration-200 rounded hover:bg-gray-100">
                <button
                  className={`px-6 p-2 text-white rounded flex items-center justify-center ${statusName === "inactive" ? "bg-red-600" : "bg-primary"
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
              className="relative w-full max-w-xl p-6 bg-white rounded-lg shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative border-b border-gray-200">
                <h2 className="py-4 text-2xl font-bold text-center">Institute Information</h2>
                <button
                  onClick={handleModalClose}
                  className="absolute text-orange-500 hover:text-orange-600 top-4 right-4"
                >
                  <IoCloseOutline className="w-8 h-8" />
                </button>
              </div>

              {/* Institute Image */}
              <div className="w-full h-72">
                <img
                  src={baseURL + modalData.logo || "/images/institue.png"}
                  alt="Institute Building"
                  className="w-full h-full object-cover rounded"
                />
              </div>

              {/* Institute Details */}
              <div className="p-4 rounded-lg border-primary mt-3 border">
                <h3 className="text-2xl font-semibold text-teal-700 mb-8">Institute Information</h3>

                <div className="space-y-5">
                  <div>
                    <p className="text-md">
                      <span className="font-semibold">Name:</span> {modalData.instituteName}
                    </p>
                  </div>

                  <div>
                    <p className="text-md">
                      <span className="font-semibold">Phone Number:</span> {modalData.phoneNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-md">
                      <span className="font-semibold">Email:</span> {modalData.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-md">
                      <span className="font-semibold">Status:</span> {statusName}
                    </p>
                  </div>

                  <div>
                    <p className="text-md">
                      <span className="font-semibold">Address:</span> {modalData.address}
                    </p>
                  </div>

                  <div>
                    <p className="text-md">
                      <span className="font-semibold">Website:</span>
                      <a href={modalData.website} target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-500">
                        {modalData.website}
                      </a>
                    </p>
                  </div>

                  <div>
                    <p className="text-md">
                      <span className="font-semibold">Established Year:</span> {modalData.establishedYear}
                    </p>
                  </div>

                  <div>
                    <p className="text-md">
                      <span className="font-semibold">Total Users:</span> {modalData.appUser}
                    </p>
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

export default InstituteTableBody;