import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import Earning from "./pages/earning/Earning";
import Login from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CheckEmail from "./pages/auth/CheckEmail";
import SetPassword from "./pages/auth/SetPassword";
import Verify from "./pages/auth/Verify_user";
import SuccessReset from "./pages/auth/SucessReset";
import Notification from "./pages/Notification";
import PrivacyPolicy from "./pages/privacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import UserManagement from "./pages/UserManagement/UserManagement";
import ParkingManagement from "./pages/ParkingManagement/ParkingManagement";
import Settings from "./components/Settings/Settings";
import PushNotification from "./components/PushNotification/PushNotification";
import SubscriptionManagement from "./components/SubscriptionManagement/SubscriptionManagement";
import InstituteManagement from "./components/InstituteManagement/InstituteManagement";
import OwnerDetailsManagement from "./components/InstituteManagement/OwnerDetails/OwnerDetailsManagement";

const Routers = () => {
  return (
    <Router>
      <Routes>

        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/success" element={<SuccessReset />} />
        <Route path="/auth/signup/verify" element={<Verify />} />
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
