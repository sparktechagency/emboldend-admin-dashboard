import { Button, Card, Divider, Input, Space, Typography, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { saveToken } from "../../features/auth/authService";
import { useResendOtpMutation, useVerifyEmailMutation } from '../../features/auth/authApi';

const { Title, Text } = Typography;

const ForgotOtp = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [code, setCode] = useState(["", "", "", ""]);
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();
  const [timer, setTimer] = useState(60);
  const inputsRef = useRef([]);
  const route = useNavigate();

  useEffect(() => {
    inputsRef.current[0]?.focus();
    setTimer(60); // Initialize timer on component mount
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input if value entered
      if (value && index < 4) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').trim();
    const pasteDigits = pasteData.replace(/\D/g, '').split('').slice(0, 4);

    if (pasteDigits.length === 4) {
      const newCode = [...code];
      pasteDigits.forEach((digit, index) => {
        newCode[index] = digit;
      });
      setCode(newCode);

      // Focus the last input after paste
      inputsRef.current[4]?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredCode = code.join("");
    if (enteredCode.length !== 4) {
      message.error("Please enter a valid 4-digit code.");
      return;
    }

    try {
      const response = await verifyEmail({ email, oneTimeCode: parseFloat(enteredCode) }).unwrap();
      console.log(response)
      if (response.success) {
        saveToken(response?.data);
        route(`/auth/login/set_password?token=${response?.data}`)
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      message.error(error.data?.message || "Verification failed. Please try again.");
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    try {
      await resendOtp({ email }).unwrap();
      setTimer(60);
      message.success("Verification code resent successfully!");
      // Clear existing code and focus first input
      setCode(["", "", "", ""]);
      inputsRef.current[0]?.focus();
    } catch (error) {
      message.error(error.data?.message || "Failed to resend code. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Image */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center p-8 ">
            <img
              src="/images/otp.png"
              className="object-contain w-full h-64"
              alt="Verification Illustration"
              loading="lazy"
            />
          </div>

          {/* Right Side - Verification Form */}
          <div className="w-full border rounded-lg p-8 md:w-1/2">
            <Space direction="vertical" size="middle" className="w-full">
              <Title level={3} className="text-center">
                Verify Your Email
              </Title>
              <Text type="secondary" className="block text-center">
                We`ve sent a 4-digit verification code to {email}
              </Text>

              <Divider />

              <div className="flex justify-center gap-3 my-6">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-2xl text-center border-gray-300 hover:border-blue-400 focus:border-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !digit && index > 0) {
                        inputsRef.current[index - 1]?.focus();
                      }
                    }}
                  />
                ))}
              </div>

              <Button
                type="primary"
                block
                size="large"
                onClick={handleSubmit}
                loading={isLoading}
                className="mt-4"
              >
                Verify Account
              </Button>

              <div className="text-center">
                <Text type="secondary">
                  Didn`t receive a code?{' '}
                  <Button
                    type="link"
                    onClick={handleResend}
                    disabled={timer > 0}
                    loading={resendLoading}
                    className="p-0"
                  >
                    {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
                  </Button>
                </Text>
              </div>
            </Space>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ForgotOtp;