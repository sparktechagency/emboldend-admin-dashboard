// RecentJoinTableBody.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const RecentJoinTableBody = ({ item }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [itemId, setItemId] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date) ? dateString : date.toLocaleDateString("en-GB");
  };

  const showViewModal = async (id) => {
    setIsViewModalOpen(true);
    setItemId(id);
  };

  const handleModalClose = () => {
    setIsViewModalOpen(false);
  };

  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 'N/A';
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start) || isNaN(end)) return 'N/A';
    const diffTime = end - start;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <>
      {/* Table Row with Improved Alignment */}
      <div
        className="grid items-center grid-cols-8 gap-2 px-2 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap cursor-pointer hover:bg-gray-200"
        onClick={() => showViewModal(item.id)}
      >
        <div className="flex items-center justify-center py-3">{item.id}</div>
        <div className="flex items-center justify-center py-3">{item.ownerName}</div>
        <div className="flex items-center justify-center py-3">{item.email}</div>
        <div className="flex items-center justify-center py-3">{item.phoneNumber}</div>
        <div className="flex items-center justify-center py-3">{item.joiningDate}</div>
        <div className="flex items-center justify-center py-3">{item.subscription}</div>
        <div className="flex items-center justify-center py-3">${item.planRunning}</div>
        <div className="flex items-center justify-center py-3">
          <span className={`px-2 py-1 rounded ${item.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
            } text-white`}>
            {item.status}
          </span>
        </div>
      </div>

      {/* Institution Details Modal */}
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

              <h2 className="mb-4 text-xl font-bold text-center text-primary">Institution Information</h2>

              <div className="px-3 py-4 space-y-3 border rounded-md border-primary">
                {/* Institution Information Section */}
                <div>
                  <h3 className="mb-2 text-base font-semibold text-primary">Institution Details</h3>
                  <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md">
                    <p className="text-sm"><span className="font-medium">Name:</span> {item.ownerName}</p>
                    <p className="text-sm"><span className="font-medium">Email:</span> {item.email || 'N/A'}</p>
                    <p className="text-sm"><span className="font-medium">Phone:</span> {item.phoneNumber || 'N/A'}</p>
                    <p className="text-sm"><span className="font-medium">Website:</span> {item.institutionWebsiteLink || 'N/A'}</p>
                    <p className="text-sm"><span className="font-medium">Established:</span> {item.establishedYear || 'N/A'}</p>
                  </div>
                </div>

                {/* Status Information Section */}
                <div>
                  <h3 className="mb-2 text-base font-semibold text-primary">Status Information</h3>
                  <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md">
                    <p className="text-sm">
                      <span className="font-medium">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded ${item.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
                        } text-white`}>
                        {item.status}
                      </span>
                    </p>
                    <p className="text-sm"><span className="font-medium">Joined On:</span> {item.joiningDate}</p>
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

export default RecentJoinTableBody;