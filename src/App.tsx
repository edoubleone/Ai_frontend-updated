import { Routes, Route, Outlet } from "react-router-dom";
import Layout from "@/components/common/Layout";
import ScrollToTop from "@/components/common/ScrollToTop";
import Landing from "./Pages/Landing";
import Pricing from "./Pages/Pricing";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import TermOfUse from "./Pages/TermAndCondition";
import Policy from "./Pages/Policy";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Forgot from "./Pages/ForgotPassword";
import Demo from "./Pages/BookDemo";
import { TestFont } from "@/components/common/TestFont";
import NotFound from "./Pages/NotFound";
import PrivateRoute from "./utils/protected-routes";
import Integrations from "./Pages/integrations";
import Conversations from "./Pages/conversations";

import CreateBot from "./Pages/dashboard/CreateBot";
import { DashboardLayout } from "./components/common/dashboard/layout";
import DashboardIndexPage from "./Pages/dashboard/Page";
import NotificationsPage from "./Pages/dashboard/notifications";
import BotsPage from "./Pages/dashboard/bots";
import ShareBots from "./Pages/dashboard/share-bots";

import Profile from "./Pages/dashboard/Profile";
import Checkout from "./Pages/dashboard/Checkout";
import TestShareBots from "./Pages/dashboard/ShareBot";
import HelpAndSupport from "./Pages/dashboard/Support";
import Payment from "./Pages/dashboard/Payment";
import TestCustomerAssistant from "./Pages/dashboard/test-customer-assistant";
import ResetPassword from "./Pages/reset-password";
import { AdminDashboardLayout } from "./components/common/admin/layout";
import AdminDashboard from "./Pages/admin";
import AdminLogin from "./Pages/admin/login";
import { AdminForgotPasswordForm } from "./components/auth/admin/forgot-password";
import AdminResetPassword from "./Pages/admin/reset-password";
import AdminDashboardUserManagement from "./Pages/admin/user-management";
import AdminDashboardCustomerSupport from "./Pages/admin/customer-support";
import AdminDashboardPayments from "./Pages/admin/payments";
import AdminSettings from "./Pages/admin/settings";
import AdminDashboardNotifications from "./Pages/admin/notifications";
import CreateCampaign from "./Pages/dashboard/create-campaign";
import LogsPage from "./Pages/logs";
import CallHistory from "./Pages/dashboard/call-history";
import AssistantCallHistoryPage from "./Pages/dashboard/assistant-call-history";
import MassAssistantCallHistoryPage from "./Pages/dashboard/mass-assistant-call-history";
import LiveAgentPage from "./Pages/dashboard/live-agent";
import CreateLiveAgent from "./Pages/dashboard/create-live-agent";
import OAuthCallback from "./Pages/auth-callback";

function App() {
  return (
    <Routes>
      {/* Dashboard Layout Route */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="logs">
            <Route path="" element={<LogsPage />} />
            <Route path="conversations/:id" element={<Conversations />} />
          </Route>
          <Route path="call-history">
            <Route path="" element={<CallHistory />} />
            <Route path=":id" element={<AssistantCallHistoryPage />} />
            <Route
              path="mass-assistant-call-history/:id"
              element={<MassAssistantCallHistoryPage />}
            />
          </Route>
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="" element={<DashboardIndexPage />} />
          <Route path="test-and-share-assistants" element={<ShareBots />} />
          <Route path="assistants">
            <Route path="" element={<BotsPage />} />
            <Route path="create-assistant" element={<CreateBot />} />
            <Route path="test/:id" element={<TestCustomerAssistant />} />
            <Route path="create-campaign/:id" element={<CreateCampaign />} />
          </Route>
          <Route path="live-agent">
            <Route path="" element={<LiveAgentPage />} />
            <Route path="create-live-agent" element={<CreateLiveAgent />} />
          </Route>
          <Route path="integrations" element={<Integrations />} />
          <Route path="createBot" element={<CreateBot />} />
          <Route path="settings" element={<Profile />} />

          <Route path="checkout" element={<Checkout />} />
          <Route path="test-and-share-bot" element={<TestShareBots />} />
          <Route path="help" element={<HelpAndSupport />} />
          <Route path="payments" element={<Payment />} />
        </Route>
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/forgot-password"
        element={<AdminForgotPasswordForm />}
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/reset-password" element={<AdminResetPassword />} />

      <Route path="/admin/dashboard" element={<AdminDashboardLayout />}>
        <Route path="" element={<AdminDashboard />} />
        <Route
          path="user-management"
          element={<AdminDashboardUserManagement />}
        />
        <Route
          path="customer-support"
          element={<AdminDashboardCustomerSupport />}
        />
        <Route path="payments" element={<AdminDashboardPayments />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="notifications" element={<AdminDashboardNotifications />} />
      </Route>

      <Route path="forgot-password" element={<Forgot />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="oauth-callback" element={<OAuthCallback />} />
      {/* Public Routes with Main Layout */}
      <Route
        path="/"
        element={
          <Layout>
            <ScrollToTop />
            <Outlet />
          </Layout>
        }
      >
        <Route index element={<Landing />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="terms" element={<TermOfUse />} />
        <Route path="privacy" element={<Policy />} />

        <Route path="test-font" element={<TestFont />} />
        <Route path="demo" element={<Demo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
