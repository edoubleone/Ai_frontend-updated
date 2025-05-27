import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import Bot from './Pages/Bot';
import Landing from './Pages/Landing';


function App() {
  return (
    // <Layout>
    //   <Routes>
    //     <Route path="/" element={< Landing/>} />
    //     {/* Add other routes here */}
    //   </Routes>
    // </Layout>
    <Bot />
  );
}

export default App;
