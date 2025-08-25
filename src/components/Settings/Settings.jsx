import { Tabs } from 'antd';
import ChangePassword from './ChangePassword';
import Profile from './Profile';

const Settings = () => {
  const items = [
    {
      key: "1",
      label: "Edit Profile",
      children: <Profile />,
    },
    {
      key: "2",
      label: "Change Password",
      children: <ChangePassword />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
      <div className="bg-white p-3 sm:p-5 lg:p-8 rounded-xl shadow-sm max-w-6xl mx-auto">
        <Tabs
          defaultActiveKey="1"
          items={items}
          className="responsive-tabs"
          size="large"
          tabPosition="top"
        />
      </div>
    </div>
  );
};

export default Settings;