import { Button, Form, Input, message } from "antd";
import { useChangePasswordMutation } from '../../features/settings/settingApi';

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChangePassword = async (values) => {
    try {
      const trimmedValues = {
        currentPassword: values.currentPassword.trim(),
        newPassword: values.newPassword.trim(),
        confirmPassword: values.confirmPassword.trim(),
      };

      // Validate new password and confirm password match
      if (trimmedValues.newPassword !== trimmedValues.confirmPassword) {
        message.error("New password and confirm password do not match");
        return;
      }

      // Validate new password is different from current password
      if (trimmedValues.currentPassword === trimmedValues.newPassword) {
        message.error("New password must be different from current password");
        return;
      }

      // Connect to API to update the password
      const result = await changePassword(trimmedValues).unwrap();

      console.log(result);

      // Show success message and reset form
      message.success("Password updated successfully!");
      form.resetFields();
    } catch (error) {
      // Handle API errors
      if (error.status === 401) {
        message.error("Current password is incorrect");
      } else if (error.data?.message) {
        message.error(error.data.message);
      } else {
        message.error("Failed to update password. Please try again later.");
      }
      console.error("Password update failed:", error);
    }
  };

  // Password validation rules
  const passwordRules = [
    { required: true, message: "Please input your password!" },
    { min: 8, message: "Password must be at least 8 characters long!" },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message: "Password must contain uppercase, lowercase, number, and special character!",
    },
  ];

  return (
    <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
          Change Password
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Update your password to keep your account secure
        </p>
      </div>

      {/* Form */}
      <Form
        form={form}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleChangePassword}
        className="space-y-4"
      >
        {/* Current Password */}
        <Form.Item
          name="currentPassword"
          label={
            <span className="text-sm sm:text-base font-medium text-gray-700">
              Current Password
            </span>
          }
          rules={[
            { required: true, message: "Please input your current password!" },
          ]}
          className="mb-4 sm:mb-6"
        >
          <Input.Password
            placeholder="Enter current password"
            className="h-10 sm:h-12 rounded-lg border-gray-300 text-sm sm:text-base"
            style={{
              border: "1px solid #E0E4EC",
              borderRadius: "8px",
            }}
            disabled={isLoading}
          />
        </Form.Item>

        {/* New Password */}
        <Form.Item
          name="newPassword"
          label={
            <span className="text-sm sm:text-base font-medium text-gray-700">
              New Password
            </span>
          }
          rules={passwordRules}
          className="mb-4 sm:mb-6"
          hasFeedback
        >
          <Input.Password
            placeholder="Enter new password"
            className="h-10 sm:h-12 rounded-lg border-gray-300 text-sm sm:text-base"
            style={{
              border: "1px solid #E0E4EC",
              borderRadius: "8px",
            }}
            disabled={isLoading}
          />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          name="confirmPassword"
          label={
            <span className="text-sm sm:text-base font-medium text-gray-700">
              Confirm New Password
            </span>
          }
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The passwords you entered do not match!")
                );
              },
            }),
          ]}
          className="mb-6 sm:mb-8"
        >
          <Input.Password
            placeholder="Confirm new password"
            className="h-10 sm:h-12 rounded-lg border-gray-300 text-sm sm:text-base"
            style={{
              border: "1px solid #E0E4EC",
              borderRadius: "8px",
            }}
            disabled={isLoading}
          />
        </Form.Item>

        {/* Password Requirements Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
          <h4 className="text-sm sm:text-base font-medium text-blue-800 mb-2">
            Password Requirements:
          </h4>
          <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
            <li>• At least 8 characters long</li>
            <li>• Contains uppercase and lowercase letters</li>
            <li>• Contains at least one number</li>
            <li>• Contains at least one special character (@$!%*?&)</li>
          </ul>
        </div>

        {/* Submit Button */}
        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;