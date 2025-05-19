import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetEarningsDetailQuery } from "../features/earning/earningApi";
import { baseURL } from "../utils/BaseURL";
import { IoCloseOutline } from "react-icons/io5";

const EarningTableRow = ({ item }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [itemId, setItemId] = useState(null);

  const { data, isLoading } = useGetEarningsDetailQuery(itemId, {
    skip: !isViewModalOpen
  });

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

  // Calculate days between dates
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
      <div className="grid items-center grid-cols-11 gap-2 px-2 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap">
        <div className="flex items-center justify-center py-3">{item.id}</div>
        <div className="flex items-center justify-center py-3">{item.ownerName}</div>
        <div className="flex items-center justify-center py-3">{item.email}</div>
        <div className="flex items-center justify-center py-3">{item.phoneNumber}</div> 
        <div className="flex items-center justify-center py-3">{item.subscription}</div> 
        <div className="flex items-center justify-center py-3">{item.planChoose}</div>
        <div className="flex items-center justify-center py-3">${item.amount}</div>
        <div className="flex items-center justify-center py-3">{item.transection}</div>
        <div className="flex items-center justify-center py-3">{item.startDate}</div>
        <div className="flex items-center justify-center py-3">{item.endDate}</div>
        <div className="flex items-center justify-center py-3">{item.status}</div>
      </div>

      {/* Booking Details Modal */}
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
              
              <h2 className="mb-4 text-xl font-bold text-center text-red-600">Subscription Information</h2>
              
              {isLoading ? (
                <div className="flex items-center justify-center py-6">
                  <span>Loading details...</span>
                </div>
              ) : (
                <div className="px-3 py-4 space-y-3 border rounded-md border-primary">
                  {/* User Information Section */}
                  <div>
                    <h3 className="mb-2 text-base font-semibold text-primary">User Information</h3>
                    <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md">
                      <p className="text-sm"><span className="font-medium">User Name:</span> {item.ownerName}</p>
                      <p className="text-sm"><span className="font-medium">Email:</span> {item.email || 'N/A'}</p>
                      <p className="text-sm"><span className="font-medium">Phone Number:</span> {item.phoneNumber || 'N/A'}</p>
                    </div>
                  </div>
                  
                  {/* Subscription Details Section */}
                  <div>
                    <h3 className="mb-2 text-base font-semibold text-primary">Subscription Details</h3>
                    <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md">
                      <p className="text-sm"><span className="font-medium">Plan:</span> {item.planChoose}</p>
                      <p className="text-sm"><span className="font-medium">Subscription Start:</span> {formatDate(item.startDate)}</p>
                      <p className="text-sm"><span className="font-medium">Subscription End:</span> {formatDate(item.endDate)}</p>
                      <p className="text-sm"><span className="font-medium">Total Days:</span> {calculateDays(item.startDate, item.endDate)}</p>
                    </div>
                  </div>
                  
                  {/* Payment Information Section */}
                  <div>
                    <h3 className="mb-2 text-base font-semibold text-primary">Payment Information</h3>
                    <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md">
                      <p className="text-sm"><span className="font-medium">Amount:</span> ${item.amount}</p>
                      <p className="text-sm"><span className="font-medium">Transaction ID:</span> {item.transection || 'N/A'}</p>
                      <p className="text-sm">
                        <span className="font-medium">Status:</span> 
                        <span className={`ml-2 px-2 py-1 rounded ${
                          item.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                        } text-white`}>
                          {item.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EarningTableRow;