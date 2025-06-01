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
import { DashboardLayout } from "./components/Features/bot/dashboard-layout";
import PrivateRoute from "./utils/protected-routes";
import Integrations from "./Pages/integrations";
import Conversations from "./Pages/conversations";
import { BotsContent } from "./components/Features/bot/bots-content";

function App() {
  return (
    <Routes>
      {/* Dashboard Layout Route */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="" element={<BotsContent />} />
          <Route path="conversations" element={<Conversations />} />
          <Route path="integrations" element={<Integrations />} />
        </Route>
      </Route>

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
        <Route path="forgot" element={<Forgot />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="test-font" element={<TestFont />} />
        <Route path="demo" element={<Demo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
