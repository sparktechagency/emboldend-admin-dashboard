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
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-start justify-center pt-5">
      <div className="rounded-xl w-full max-w-[800px]">
        <div className="flex items-end justify-between space-x-4">
          <div className="flex items-center gap-3">
            <div className="w-[140px] h-[140px] rounded-full border-2 border-primary mx-auto flex flex-col items-center relative">
              <div className="w-full h-full rounded-full">
                <img
                  src={previewImage}
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>

              {isEditing && (
                <div className="absolute flex items-center justify-center w-8 h-8 p-2 text-center rounded-full cursor-pointer bg-[#FF991C] bottom-1 right-5">
                  <Upload showUploadList={false} onChange={handleFileChange}>
                    <MdEdit className="mt-1 text-xl text-white" />
                  </Upload>
                </div>
              )}
            </div>
            <h2 className="text-4xl font-semibold text-gray-800">
              {profile.name}
            </h2>
          </div>
          <Button
            type="text"
            icon={<EditOutlined />}
            className="mt-2 border border-primary w-[150px]"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block text-gray-600">Full Name</label>
          <Input
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="border rounded-lg border-primary p-2 h-[44px]"
          />

          <label className="block text-gray-600">Email</label>
          <Input
            name="email"
            type="email"
            readOnly
            value={profile.email}
            disabled
            className="border rounded-lg border-primary p-2 h-[44px]"
          />

          <label className="block text-gray-600">Contact Number</label>
          <Input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            disabled={isPhoneReadOnly || !isEditing}
            className="border rounded-lg border-primary p-2 h-[44px]"
            placeholder="Enter your phone number"
          />
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <Button
              type="primary"
              loading={updateProfileLoading}
              icon={<SaveOutlined />}
              className="mt-6 w-[200px] bg-primary"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;