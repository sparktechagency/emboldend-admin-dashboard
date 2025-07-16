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
    <div className="w-full">
      {/* Top Navigation Bar */}
      <div className="flex items-center mb-4">
        <button className="p-2 rounded-full hover:bg-gray-200">
          {/* <ArrowLeftOutlined size={20} /> */}
        </button>
      </div>

      {/* User Profile Card */}
      <div className="p-4 mb-4">
        <div className="flex items-center">
          <div className="mr-4">
            <img src="/icons/owner.png" alt="Profile" className="rounded-full w-24 h-24" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold"><span className="text-black">Owner Name:</span> John Joe</h2>
                <p className="text-gray-600"><span className="text-black">Email:</span> Example@Email.Com</p>
                <p className="text-gray-600"><span className="text-black">Phone Number:</span> 012345-678901</p>
                <button
                  onClick={showModal}
                  className="text-blue-500 hover:text-blue-700 text-sm mt-1"
                >
                  See Full Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OwnerTableHead columns={columns} />
      {/* Ant Design Modal - Styled to match the image */}

      <Modal
        title={
          <div className="text-3xl font-bold text-center mb-4">Account Information</div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={600}
        closeIcon={<CloseCircleOutlined style={{ color: '#FF8C00', fontSize: '24px' }} />}
        className="custom-modal"
      >
        <div className="border border-gray-300 rounded-lg p-8">
          {/* Owner Information */}
          <div className="mb-8">
            <h4 className="text-2xl font-medium text-teal-700 mb-4">Owner Information</h4>
            <div className="space-y-3">
              <p className="text-base"><span className="font-medium">Name:</span> Sabbir Ahmed</p>
              <p className="text-base"><span className="font-medium">Email:</span> example@gmail.com</p>
              <p className="text-base"><span className="font-medium">Phone Number:</span> +1234565749962</p>
              <p className="text-base"><span className="font-medium">Total Institute:</span> 9</p>
              <p className="text-base"><span className="font-medium">Total Application User:</span> 50</p>
            </div>
          </div>

          {/* Subscription Information */}
          <div>
            <h4 className="text-2xl font-medium text-teal-700 mb-4">Subscription Information</h4>
            <div className="space-y-3">
              <p className="text-base"><span className="font-medium">Subscription:</span> Yes</p>
              <p className="text-base"><span className="font-medium">Subscription Plan:</span> 1 Month</p>
              <p className="text-base"><span className="font-medium">Amount:</span> $60</p>
              <p className="text-base"><span className="font-medium">Purchase date:</span> March 30, 2025</p>
              <p className="text-base"><span className="font-medium">Day Remaining:</span> 20Days</p>
              <p className="text-base"><span className="font-medium">Transaction ID:</span> 1234567891</p>
              <p className="text-base"><span className="font-medium">Payment By:</span> Credit Card</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}