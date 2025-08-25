// src/components/Layout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar';
import Navber from '../components/Navber';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed z-30 w-72 bg-white border-r border-primary transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 ease-in-out h-screen`}
      >
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Backdrop Overlay (for mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 transition-all duration-300 w-full">
        <Navber toggleSidebar={toggleSidebar} />
        <div className="px-4 sm:px-6 md:px-8 pb-5 overflow-y-auto w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;