import { Button } from "antd";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function CheckEmail() {
  const route = useNavigate();
  
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      <div className="flex flex-col items-center w-full max-w-6xl md:flex-row">
        {/* Left Side - Image (Hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 xl:w-2/3">
          <img
            src={"/images/check_mail.png"}
            className="object-contain w-full h-auto max-h-[90vh]"
            alt="Check Mail Illustration"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3">
          <div className="w-full max-w-md p-6 mx-auto border rounded-lg border-primary md:p-8">
            <div className="flex flex-col items-center justify-center gap-4">
              {/* Mail Icon */}
              <img
                src={"/icons/check_mail_icons.png"}
                alt="Mail Icon"
                className="w-14 h-14"
              />

              {/* Heading */}
              <h3 className="text-3xl font-semibold text-center">Check your email</h3>
              <p className="text-sm font-normal text-center text-gray-600 md:text-base">
                We sent a password reset link to olivia@untitledui.com
              </p>
            </div>

            {/* Button */}
            <div className="mt-6 ">
              <Button
                onClick={() => window.location.href = "https://mail.google.com/mail/"}
                type="primary"
                className="w-full"
                size="large"
              >
                Open email app
              </Button>
            </div>
              <p className="mt-6 text-sm font-normal text-center text-textSecondary ">Didn’t receive the email? <span className="text-sm font-normal text-primary cursor-pointer">Click to resend</span></p>
            {/* Back to Login */}
            <button
              onClick={() => route('/auth/login')}
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