// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
