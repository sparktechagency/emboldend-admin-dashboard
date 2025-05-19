import { Button, Input, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import { saveToken } from "../../features/auth/authService";
import { baseURL } from "../../utils/BaseURL";

export default function LoginPage() {
  const route = useNavigate();
  const [Login, { isLoading }] = useLoginMutation();

  const handleGoogleLogin = () => {
    window.location.href = `${baseURL}/api/v1/auth/google`;
  };

  const onFinish = async (values) => {
    // try {
    //   const response = await Login(values).unwrap();
    //   saveToken(response?.data?.token);
    //   localStorage.setItem("adminLoginId", response?.data?.user?._id);
    //   route("/");
    // } catch (error) {
    //   if(error?.data){
    //     message.error(error?.data?.message);
    //   }else{
    //     message.error("Server error Please try Another time")
    //   }
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      <div className="flex w-full max-w-7xl md:flex-row md:items-center md:gap-8 lg:gap-20">
        {/* Left Side - Image (Hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 xl:w-2/3">
          <img
            src={"/images/login.png"}
            className="object-contain w-full h-auto max-h-[90vh]"
            alt="Login Illustration"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3">
          <div className="w-full max-w-md p-6 mx-auto border rounded-lg border-primary md:p-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <img
                src={"/icons/dashboard_logoCopy.png"}
                alt="Ubuntu Bites Logo"
                className="w-auto h-24"
              />
              <h2 className="text-sm font-normal text-center text-gray-800 md:text-base">
                Welcome back! Please enter your details.
              </h2>
            </div>

            <Form layout="vertical" onFinish={onFinish} className="w-full mt-6">
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
              >
                <Input placeholder="Enter your email" size="large" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  size="large"
                />
              </Form.Item>

              <div className="mb-4 text-sm text-end">
                <p
                  onClick={() => route("/auth/login/forgot_password")}
                  className="text-gray-800 cursor-pointer hover:underline"
                >
                  Forgot password?
                </p>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={isLoading}
              >
                Sign in
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}