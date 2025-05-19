import { Button } from "antd";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function PasswordResetSuccess() {
  const router = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      <div className="flex flex-col items-center w-full max-w-7xl md:flex-row md:gap-8 lg:gap-20">
        {/* Left Side - Image (Hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 xl:w-2/3">
          <img
            src={"/images/sucessfull_reset.png"}
            className="object-contain w-full h-auto max-h-[90vh]"
            alt="Password Reset Success Illustration"
          />
        </div>

        {/* Right Side - Success Message */}
        <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3">
          <div className="p-6 mx-auto border rounded-lg w-fullmax-w-md border-primary md:p-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <img
                src={"/icons/sucess_reset.png"}
                alt="Success Icon"
                className="w-14 h-14"
              />
              <h3 className="text-3xl font-semibold text-center">Password reset</h3>
              <p className="text-sm font-normal text-center text-gray-600 md:text-base">
                Your password has been successfully reset. Click below to log in magically.
              </p>
            </div>

            <div className="mt-6">
              <Button
                onClick={() => router('/')}
                type="primary"
                className="w-full"
                size="large"
                loading={loading}
              >
                Continue
              </Button>
            </div>

            <button
              onClick={() => router('/auth/login')}
              className="flex items-center justify-center w-full gap-2 mt-6 text-base text-gray-500 cursor-pointer"
            >
              <FaArrowLeftLong />
              <span>Back to log in</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}