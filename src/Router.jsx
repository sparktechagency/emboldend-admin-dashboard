import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import InstituteManagement from "./components/InstituteManagement/InstituteManagement";
import OwnerDetailsManagement from "./components/InstituteManagement/OwnerDetails/OwnerDetailsManagement";
import PushNotification from "./components/PushNotification/PushNotification";
import Settings from "./components/Settings/Settings";
import SubscriptionManagement from "./components/SubscriptionManagement/SubscriptionManagement";
import Layout from "./layouts/Layout";
import CheckEmail from "./pages/auth/CheckEmail";
import ForgotOtp from './pages/auth/ForgotOtp';
import ForgotPassword from "./pages/auth/ForgotPassword";
import SetPassword from "./pages/auth/SetPassword";
import Login from "./pages/auth/SignIn";
import SuccessReset from "./pages/auth/SucessReset";
import Dashboard from "./pages/dashboard/Dashboard";
import Earning from "./pages/earning/Earning";
import NotFound from "./pages/NotFound";
import Notification from "./pages/Notification";
import ParkingManagement from "./pages/ParkingManagement/ParkingManagement";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import UserManagement from "./pages/UserManagement/UserManagement";
import UserProfile from "./pages/UserProfile";

const Routers = () => {
  return (
    <Router>
      <Routes>

        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/success" element={<SuccessReset />} />
        <Route path="/auth/signup/checkOtp" element={<ForgotOtp />} />
        <Route
          path="/auth/login/forgot_password"
          element={<ForgotPassword />}
        />
        <Route path="/auth/login/check_email" element={<CheckEmail />} />
        <Route path="/auth/login/set_password" element={<SetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <Layout />
            //  </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="institute-management">
            <Route index element={<InstituteManagement />} />
            <Route path="owner-details/:id" element={<OwnerDetailsManagement />} />
          </Route>




          <Route path="user-management" element={<UserManagement />} />
          <Route path="settings" element={<Settings />} />
          <Route path="push-notification" element={<PushNotification />} />
          <Route path="subscription" element={<SubscriptionManagement />} />
          <Route path="parking-management">
            <Route index element={<ParkingManagement />} />
          </Route>
          <Route path="earning" element={<Earning />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="notification" element={<Notification />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-conditions" element={<TermsConditions />} />
        </Route>

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Routers;
