import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import Bot from './Pages/Bot';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Bot />} />
        {/* Add other routes here */}
      </Routes>
    </Layout>
  );
}

export default App;
