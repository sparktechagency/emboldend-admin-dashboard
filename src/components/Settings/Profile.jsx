import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Input, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useEditProfileMutation, useGetProfileQuery } from '../../features/settings/settingApi';
import { baseURL } from '../../utils/BaseURL';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPhoneReadOnly, setIsPhoneReadOnly] = useState(false);
  const [editProfile, { isLoading: updateProfileLoading }] = useEditProfileMutation();
  const { data: profileData, isLoading, refetch } = useGetProfileQuery();

  // Initialize profile state with default values
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    "https://i.ibb.co.com/fYrFP06M/images-1.png"
  );

  // Set initial values when profile data is loaded
  useEffect(() => {
    if (profileData?.data) {
      const userData = profileData.data;
      setProfile({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });

      if (userData.profileImage) {
        setPreviewImage(`${baseURL}${userData.profileImage}`);
      }
    }
  }, [profileData]);

  const handleFileChange = ({ file }) => {
    if (!isEditing) return;
    if (!file.originFileObj) return;

    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => {
      setPreviewImage(reader.result);
      setProfileImageFile(file.originFileObj);
    };
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const phonePattern = /^[0-9]{10,15}$/;

    if (!profile.phone) {
      message.error("Phone number is required");
      return;
    }

    if (!phonePattern.test(profile.phone)) {
      message.error("Please enter a valid phone number (10-15 digits)");
      return;
    }

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);

    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }

    try {
      const result = await editProfile(formData).unwrap();

      if (result.success) {
        await refetch();
        if (result.data?.profileImage) {
          setPreviewImage(`${baseURL}${result.data.profileImage}`);
        }
        message.success("Profile updated successfully");
        setIsEditing(false);
        setIsPhoneReadOnly(true);
        setProfileImageFile(null);
      } else {
        message.error(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("API Error:", error);
      message.error(error?.data?.message || error?.message || "Error updating profile");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32 sm:h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center lg:items-start justify-center pt-2 sm:pt-5 px-2 sm:px-4">
      <div className="rounded-xl w-full max-w-4xl">
        {/* Header Section - Profile Image and Name */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          {/* Profile Image and Name */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full border-2 border-primary mx-auto relative">
                <img
                  src={previewImage}
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full"
                />

                {isEditing && (
                  <div className="absolute flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 p-1 sm:p-2 rounded-full cursor-pointer bg-[#FF991C] -bottom-1 -right-1 sm:bottom-1 sm:right-2">
                    <Upload showUploadList={false} onChange={handleFileChange}>
                      <MdEdit className="text-sm sm:text-xl text-white" />
                    </Upload>
                  </div>
                )}
              </div>
            </div>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-semibold text-gray-800 break-words">
                {profile.name || "User Name"}
              </h2>
            </div>
          </div>

          {/* Edit Button */}
          <div className="w-full sm:w-auto">
            <Button
              type="text"
              icon={<EditOutlined />}
              className="border border-primary w-full sm:w-auto min-w-[120px] sm:min-w-[150px] h-9 sm:h-10"
              onClick={() => setIsEditing(!isEditing)}
            >
              <span className="text-sm sm:text-base">
                {isEditing ? "Cancel" : "Edit Profile"}
              </span>
            </Button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 sm:space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm sm:text-base text-gray-600 mb-2">
              Full Name
            </label>
            <Input
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="border rounded-lg border-primary h-10 sm:h-12 text-sm sm:text-base"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm sm:text-base text-gray-600 mb-2">
              Email
            </label>
            <Input
              name="email"
              type="email"
              readOnly
              value={profile.email}
              disabled
              className="border rounded-lg border-primary h-10 sm:h-12 text-sm sm:text-base bg-gray-50"
              placeholder="email@example.com"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm sm:text-base text-gray-600 mb-2">
              Contact Number
            </label>
            <Input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={isPhoneReadOnly || !isEditing}
              className="border rounded-lg border-primary h-10 sm:h-12 text-sm sm:text-base"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="flex justify-center sm:justify-end mt-6 sm:mt-8">
            <Button
              type="primary"
              loading={updateProfileLoading}
              icon={<SaveOutlined />}
              className="bg-primary w-full sm:w-auto min-w-[160px] sm:min-w-[200px] h-10 sm:h-12 text-sm sm:text-base"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;