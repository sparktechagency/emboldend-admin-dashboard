import { Button, Input, Form, message } from "antd";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../features/auth/authApi";
import { saveToken } from "../../features/auth/authService";

export default function ResetPasswordPage() {
  const router = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onFinish = async (values) => {
    try {
      const credentials = {
        ...values,
        token: token,
      };
      await resetPassword(credentials).unwrap();
      saveToken(token);
      router('/auth/success');
    } catch (error) {
      console.error("Password reset failed:", error);
      console.error("Full error response:", error.data);
      message.error("Password reset failed. Please try again.");
    }
  };

  const handleBackToLogin = () => {
    router('/auth/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      <div className="flex flex-col w-full max-w-7xl md:flex-row md:gap-8 lg:gap-20">
        {/* Left Side - Image (Hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 xl:w-2/3">
          <img
            src={"/images/set_new-password.png"}
            className="object-contain w-full h-auto max-h-[90vh]"
            alt="Reset Password Illustration"
          />
        </div>

        {/* Right Side - Reset Password Form */}
        <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3">
          <div className="w-full max-w-md p-6 mx-auto border rounded-lg border-primary md:p-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <img
                src={"/icons/forgot_icons.png"}
                alt="Password Icon"
                className="w-15 h-15"
              />
              <h3 className="text-3xl font-semibold text-center">Set new password</h3>
              <p className="text-sm font-normal text-center text-gray-800 md:text-base">
                Your new password must be different from previously used passwords.
              </p>
            </div>

            <Form layout="vertical" onFinish={onFinish} className="w-full mt-6">
              <Form.Item
                name="newPassword"
                label="Password"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input.Password 
                  placeholder="Enter your password" 
                  size="large" 
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password 
                  placeholder="Confirm your password" 
                  size="large" 
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={isLoading}
              >
                Reset password
              </Button>
            </Form>

            <button
              onClick={handleBackToLogin}
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