import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useState } from 'react';
import OwnerTableHead from './OwnerTableHead';

// Main App Component
export default function OwnerDetailsManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    "SL",
    "Institute Name",
    "Location",
    "Email",
    "App User",
    "Phone Number",
    "Created",
    "Status",
  ];

  return (
    <div className="w-full sm:w-full  px-2 sm:px-4 lg:px-6">
      {/* Top Navigation Bar */}
      <div className="flex items-center mb-3 sm:mb-4">
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          {/* <ArrowLeftOutlined size={20} /> */}
        </button>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src="/icons/owner.png"
              alt="Profile"
              className="rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover border-2 border-gray-200"
            />
          </div>

          {/* Profile Information */}
          <div className="flex-1 w-full text-center sm:text-left">
            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                <span className="text-black">Owner Name:</span>
                <span className="ml-2 text-gray-700">John Joe</span>
              </h2>

              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm sm:text-base text-gray-600 break-all">
                  <span className="font-medium text-black">Email:</span>
                  <span className="ml-2">Example@Email.Com</span>
                </p>

                <p className="text-sm sm:text-base text-gray-600">
                  <span className="font-medium text-black">Phone Number:</span>
                  <span className="ml-2">012345-678901</span>
                </p>
              </div>

              <button
                onClick={showModal}
                className="inline-block text-blue-500 hover:text-blue-700 text-sm sm:text-base font-medium mt-2 sm:mt-3 transition-colors underline hover:no-underline"
              >
                See Full Detail
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <OwnerTableHead columns={columns} />
      </div>

      {/* Responsive Modal */}
      <Modal
        title={
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-2 sm:mb-4 text-gray-800">
            Account Information
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width="90%"
        style={{ maxWidth: '600px', top: '20px' }}
        closeIcon={
          <CloseCircleOutlined
            style={{
              color: '#FF8C00',
              fontSize: window.innerWidth < 640 ? '20px' : '24px'
            }}
          />
        }
        className="custom-modal"
        centered={window.innerWidth < 640}
      >
        <div className="border border-gray-300 rounded-lg p-4 sm:p-6 lg:p-8">
          {/* Owner Information Section */}
          <div className="mb-6 sm:mb-8">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-medium text-teal-700 mb-3 sm:mb-4 border-b border-teal-200 pb-2">
              Owner Information
            </h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium text-gray-800 text-sm sm:text-base min-w-[140px] sm:min-w-[160px]">
                  Name:
                </span>
                <span className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-0">
                  Sabbir Ahmed
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium text-gray-800 text-sm sm:text-base min-w-[140px] sm:min-w-[160px]">
                  Email:
                </span>
                <span className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-0 break-all">
                  example@gmail.com
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium text-gray-800 text-sm sm:text-base min-w-[140px] sm:min-w-[160px]">
                  Phone Number:
                </span>
                <span className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-0">
                  +1234565749962
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium text-gray-800 text-sm sm:text-base min-w-[140px] sm:min-w-[160px]">
                  Total Institute:
                </span>
                <span className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-0">
                  9
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium text-gray-800 text-sm sm:text-base min-w-[140px] sm:min-w-[160px]">
                  Total App Users:
                </span>
                <span className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-0">
                  50
                </span>
              </div>
            </div>
          </div>

          {/* Subscription Information Section */}
          <div>
            <h4 className="text-lg sm:text-xl lg:text-2xl font-medium text-teal-700 mb-3 sm:mb-4 border-b border-teal-200 pb-2">
              Subscription Information
            </h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium text-gray-800 text-sm sm:text-base min-w-[140px] sm:min-w-[160px]">
                  Subscription:
                </span>
                <span className="text-green-600 font-medium text-sm sm:text-base mt-1 sm:mt-0">
                  Active
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium text-gray-800 text-sm sm:text-base min-w-[140px] sm:min-w-[160px]">
                  Plan:
                </span>
                <span className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-0">
                  1 Month
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium text-gray-800 text-sm sm:text-base min-w-[140px] sm:min-w-[160px]">
                  Amount:
                </span>
                <span className="text-gray-600 font-medium text-sm sm:text-base mt-1 sm:mt-0">
                  $60
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium text-gray-800 text-sm sm:text-base min-w-[140px] sm:min-w-[160px]">
                  Purchase Date:
                </span>
                <span className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-0">
                  March 30, 2025
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium text-gray-800 text-sm sm:text-base min-w-[140px] sm:min-w-[160px]">
                  Days Remaining:
                </span>
                <span className="text-orange-600 font-medium text-sm sm:text-base mt-1 sm:mt-0">
                  20 Days
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium text-gray-800 text-sm sm:text-base min-w-[140px] sm:min-w-[160px]">
                  Transaction ID:
                </span>
                <span className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-0 font-mono">
                  1234567891
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium text-gray-800 text-sm sm:text-base min-w-[140px] sm:min-w-[160px]">
                  Payment Method:
                </span>
                <span className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-0">
                  Credit Card
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}