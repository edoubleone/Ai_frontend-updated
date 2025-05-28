import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/common/Layout';
// import Bot from './Pages/Bot';
import Landing from './Pages/Landing';
import Pricing from './Pages/Pricing';
import About from './Pages/About';
import Contact from './Pages/Contact';
import TermOfUse from './Pages/TermAndCondition';
import Policy from './Pages/Policy';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Forgot from './Pages/ForgotPassword';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={< Landing/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/terms" element={<TermOfUse />} />
        <Route path="/privacy" element={<Policy />} />
        <Route path="/signup" element={<Forgot />} />
        {/* Add other routes here */}
      </Routes>
    </Layout>
   
 
    // <Bot />
  );
}

export default App;
