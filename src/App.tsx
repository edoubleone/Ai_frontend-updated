
import { Routes, Route } from 'react-router-dom';
import Bot from './Pages/Bot';


function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Bot/>} />
      </Routes>
    </div>
  );
}

export default App;
