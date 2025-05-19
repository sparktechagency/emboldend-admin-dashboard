import { Button, Input, Form } from "antd";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../features/auth/authApi";

export default function ForgotPassword() {
  const route = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onFinish = async (values) => {
    // try {
    //   await forgotPassword(values).unwrap();
    //   route("/auth/login/check_email");
    // } catch (error) {
    //   console.error("OTP verification failed:", error);
    //   alert("Email does not exist.");
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      <div className="flex flex-col items-center justify-center max-w-7xl items md:flex-row md:gap-8 lg:gap-20">
        {/* Left Side - Image (Hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 xl:w-2/3">
          <img
            src={"/images/forgot.png"}
            className="object-contain w-full h-auto max-h-[90vh]"
            alt="Forgot Password Illustration"
          />
        </div>

        {/* Right Side - Forgot Password Form */}
        <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3">
          <div className="w-full max-w-md px-8 py-10 mx-auto border rounded-lg border-primary">
            <div className="flex flex-col items-center justify-center gap-4">
              <img
                src={"/icons/forgot_icons.png"}
                alt="Key Icon"
                className="w-14 h-14"
              />
              <h3 className="text-3xl font-semibold text-center">Forgot password?</h3>
              <p className="text-sm font-normal text-center text-gray-800 md:text-base">
                No worries, we`ll send you reset instructions.
              </p>
            </div>

            <Form layout="vertical" onFinish={onFinish} className="flex flex-col w-full gap-3 mt-6">
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                ]}
                className="mb-4"
              >
                <Input placeholder="Enter your email" size="large" />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={isLoading}
              >
                Submit
              </Button>
            </Form>

            <button
              onClick={() => route("/auth/login")}
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