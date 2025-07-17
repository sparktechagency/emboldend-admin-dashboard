import { Card, Dropdown, Radio, Tooltip, message } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useUpdateStatusWithInstituteMutation } from '../../features/instituteManagement/instituteManagementApi';

const InstituteManagementTableBody = ({ item, refetch }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [statusName, setStatusName] = useState(item?.status === 'ACTIVE' ? 'Active' : 'Inactive');
  const navigate = useNavigate();
  const [updateStatus, { isLoading }] = useUpdateStatusWithInstituteMutation();

  const showViewModal = () => setIsViewModalOpen(true);
  const handleModalClose = () => setIsViewModalOpen(false);

  useEffect(() => {
    setStatusName(item?.status === 'ACTIVE' ? 'Active' : 'Inactive');
  }, [item?.status]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const response = await updateStatus({
        id: item._id,
        data: { status: newStatus }
      }).unwrap();



      if (response) {
        setStatusName(newStatus === 'ACTIVE' ? 'Active' : 'Inactive');
        refetch()
        message.success('Status updated successfully');
      }
    } catch (error) {
      message.error('Failed to update status');
      console.error('Error updating status:', error);
    } finally {
      setDropdownOpen(false);
    }
  };

  const tableItem = {
    id: item._id,
    ownerName: item.name,
    email: item.email,
    phoneNumber: item.phone || 'N/A',
    totalInstitute: item.totalInstitutions,
    totalAppUser: item.totalUsers,
    subscription: item.subscribed ? 'Yes' : 'No',
    planRunning: item.planRunning > 0 ? `${item.planRunning} days` : 'No plan',
    status: item.status === 'ACTIVE' ? 'active' : 'inactive',
    paid: item.subscribed,
    adminRevenue: 10,
    parkingSlot: 4,
  };

  return (
    <>
      {/* Table Row */}
      <div className="grid items-center grid-cols-11 gap-2 px-2 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap">
        <div className="flex items-center justify-center py-3">{tableItem.id.slice(-6)}</div>
        <div className="flex items-center justify-center py-3">
          <Tooltip placement="topLeft" title={tableItem.ownerName}>
            {tableItem.ownerName.length > 10 ? `${tableItem.ownerName.substring(0, 10)}...` : tableItem.ownerName}
          </Tooltip>
        </div>

        <div className="flex items-center justify-center py-3"> <Tooltip placement="topLeft" title={tableItem.email}>
            {tableItem.email.length > 10 ? `${tableItem.email.substring(0, 10)}...` : tableItem.email}
          </Tooltip></div>
        <div className="flex items-center justify-center py-3">{tableItem.phoneNumber}</div>
        <div className="flex items-center justify-center py-3">{tableItem.totalInstitute}</div>
        <div className="flex items-center justify-center py-3">{tableItem.totalAppUser}</div>
        <div className="flex items-center justify-center py-3">
          <span
            className={`px-3 py-1 rounded-full ${tableItem.subscription === 'Yes'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
              }`}
          >
            {tableItem.subscription}
          </span>
        </div>
        <div className="flex items-center justify-center py-3">{tableItem.planRunning}</div>
        <div className="flex items-center justify-center py-3">
          <span
            className={`px-3 py-1 rounded-full ${tableItem.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
              }`}
          >
            {tableItem.status}
          </span>
        </div>

        <div className="flex items-center justify-center col-span-2 gap-2 px-1.5 py-1 border rounded border-SurfacePrimary">
          <button
            onClick={() => navigate(`/institute-management/owner-details/${tableItem.id}`)}
            className="w-full p-2 text-white transition duration-200 rounded bg-primary hover:bg-primary-dark"
          >
            View Details
          </button>
          <div className="w-full">
            <Dropdown
              open={dropdownOpen}
              onOpenChange={setDropdownOpen}
              trigger={['click']}
              dropdownRender={() => (
                <Card className="shadow-lg w-38">
                  <Radio.Group
                    onChange={handleStatusChange}
                    value={statusName === 'Active' ? 'ACTIVE' : 'INACTIVE'}
                    className="flex flex-col space-y-2"
                  >
                    <Radio value="ACTIVE" className="font-semibold text-primary">
                      Active
                    </Radio>
                    <Radio value="INACTIVE" className="text-black">
                      Inactive
                    </Radio>
                  </Radio.Group>
                </Card>
              )}
              placement="bottomRight"
            >
              <div className="flex justify-center py-1 text-center transition duration-200 rounded hover:bg-gray-100">
                <button
                  className={`px-6 p-2 text-white rounded flex items-center justify-center ${statusName === 'Inactive' ? 'bg-red-600' : 'bg-primary'
                    }`}
                  disabled={isLoading}
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
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleModalClose}
                className="absolute text-gray-500 top-3 right-3 hover:text-gray-800"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>

              <h2 className="mb-4 text-xl font-bold text-center text-primary">
                Institute Details
              </h2>

              <div className="px-3 py-4 space-y-3 border rounded-md border-primary">
                {/* Owner Information Section */}
                <div>
                  <h3 className="mb-2 text-base font-semibold text-primary">
                    Owner Information
                  </h3>
                  <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md">
                    <p className="text-sm">
                      <span className="font-medium">ID:</span> {tableItem.id}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Name:</span> {tableItem.ownerName}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Email:</span> {tableItem.email}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Phone:</span> {tableItem.phoneNumber}
                    </p>
                  </div>
                </div>

                {/* Institute Details Section */}
                <div>
                  <h3 className="mb-2 text-base font-semibold text-primary">
                    Institute Details
                  </h3>
                  <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md">
                    <p className="text-sm">
                      <span className="font-medium">Total Institutes:</span>{' '}
                      {tableItem.totalInstitute}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Total App Users:</span>{' '}
                      {tableItem.totalAppUser}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Subscription:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full ${tableItem.subscription === 'Yes'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {tableItem.subscription}
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Current Plan:</span>{' '}
                      {tableItem.planRunning}
                    </p>
                  </div>
                </div>

                {/* Status and Revenue Section */}
                <div>
                  <h3 className="mb-2 text-base font-semibold text-primary">
                    Status & Revenue
                  </h3>
                  <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md">
                    <p className="text-sm">
                      <span className="font-medium">Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full ${tableItem.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {tableItem.status}
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Admin Revenue:</span> $
                      {tableItem.adminRevenue}
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

export default InstituteManagementTableBody;