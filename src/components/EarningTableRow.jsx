import { Tooltip } from 'antd';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const EarningTableRow = ({ item, isFetching }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'N/A') return 'N/A';
    try {
      const date = new Date(dateString);
      return isNaN(date) ? dateString : date.toLocaleDateString("en-GB");
    } catch {
      return 'N/A';
    }
  };

  const handleModalClose = () => {
    setIsViewModalOpen(false);
  };

  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate || startDate === 'N/A' || endDate === 'N/A') return 'N/A';
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start) || isNaN(end)) return 'N/A';
      const diffTime = end - start;
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 'N/A';
    } catch {
      return 'N/A';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500';
      case 'CANCELLED':
        return 'bg-red-500';
      case 'INACTIVE':
        return 'bg-yellow-500';
      case 'EXPIRED':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  const truncateText = (text, maxLength = 20) => {
    if (!text || text === 'N/A') return text;
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <>
      {/* Table Row */}
      <div
        className="grid items-center grid-cols-11 gap-2 px-2 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap cursor-pointer hover:bg-gray-200 transition-colors"
        onClick={() => setIsViewModalOpen(true)}
      >
        <div className="flex items-center justify-center py-3 font-medium">
          #{item.id}
        </div>
        <div className="flex items-center justify-center py-3" title={item.ownerName}>
          <Tooltip placement="topLeft" title={truncateText(item.ownerName)}>
            {truncateText(item.ownerName).length > 10 ? `${truncateText(item.ownerName).substring(0, 10)}...` : truncateText(item.ownerName)}
          </Tooltip>
        </div>
        <div className="flex items-center justify-center py-3" title={item.email}>
          <Tooltip placement="topLeft" title={truncateText(item.email)}>
            {truncateText(item.email, 10)}
          </Tooltip>
        </div>
        <div className="flex items-center justify-center py-3">
          {item.phoneNumber}
        </div>
        <div className="flex items-center justify-center py-3">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            {item.subscription}
          </span>
        </div>
        <div className="flex items-center justify-center py-3" title={item.planChoose}>
          {truncateText(item.planChoose)}
        </div>
        <div className="flex items-center justify-center py-3 font-medium">
          ${item.amount}
        </div>
        <div className="flex items-center justify-center py-3" title={item.transection}>
          {truncateText(item.transection, 15)}
        </div>
        <div className="flex items-center justify-center py-3">
          {formatDate(item.startDate)}
        </div>
        <div className="flex items-center justify-center py-3">
          {formatDate(item.endDate)}
        </div>
        <div className="flex items-center justify-center py-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)} text-white`}>
            {item.status}
          </span>
        </div>
      </div>

      {/* Subscription Details Modal */}
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
              className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleModalClose}
                className="absolute text-gray-500 top-3 right-3 hover:text-gray-800 transition-colors"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>

              <h2 className="mb-4 text-xl font-bold text-center text-primary">
                Subscription Details
              </h2>

              <div className="px-3 py-4 space-y-4 border rounded-md border-primary">
                {/* Record Information */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Record ID:</span>
                    <span className="text-sm font-bold text-primary">#{item.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)} text-white`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* User Information Section */}
                <div>
                  <h3 className="mb-2 text-base font-semibold text-primary">User Information</h3>
                  <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">Name:</span>
                      <span className="text-sm text-right">{item.ownerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">Email:</span>
                      <span className="text-sm text-right break-all">{item.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">Phone:</span>
                      <span className="text-sm text-right">{item.phoneNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Subscription Details Section */}
                <div>
                  <h3 className="mb-2 text-base font-semibold text-primary">Subscription Details</h3>
                  <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">Plan:</span>
                      <span className="text-sm text-right">{item.planChoose}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">Start Date:</span>
                      <span className="text-sm text-right">{formatDate(item.startDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">End Date:</span>
                      <span className="text-sm text-right">{formatDate(item.endDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">Duration:</span>
                      <span className="text-sm text-right">
                        {calculateDays(item.startDate, item.endDate)} days
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Information Section */}
                <div>
                  <h3 className="mb-2 text-base font-semibold text-primary">Payment Information</h3>
                  <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">Amount:</span>
                      <span className="text-sm text-right font-bold text-green-600">
                        ${item.amount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">Transaction ID:</span>
                      <span className="text-sm text-right break-all font-mono">
                        {item.transection}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleModalClose}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EarningTableRow;