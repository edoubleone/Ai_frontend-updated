import Layout from "@/components/common/Layout";
// import Bot from './Pages/Bot';
import Landing from "./Pages/Landing";
import Pricing from "./Pages/Pricing";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import TermOfUse from "./Pages/TermAndCondition";
import Policy from "./Pages/Policy";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Forgot from "./Pages/ForgotPassword";
import { TempDashboardLayout } from "./components/Features/bot/temp-dashboard-layout";
import Conversations from "./Pages/conversations";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/common/ScrollToTop";

import Demo from "./Pages/BookDemo";
import { TestFont } from "@/components/common/TestFont";
import NotFound from "./Pages/NotFound";
import PrivateRoute from "./utils/protected-routes";
// import NotFound from './Pages/NotFound';

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/terms" element={<TermOfUse />} />
        <Route path="/privacy" element={<Policy />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Add other routes here */}
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<TempDashboardLayout />}>
            <Route path="conversations" element={<Conversations />} />
          </Route>
        </Route>

        {/* <Bot /> */}
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/test-font" element={<TestFont />} />
        <Route path="/demo" element={<Demo />} />
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
