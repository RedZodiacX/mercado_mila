import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddItemsPage from './pages/AddItemsPage';
import SelectItemsPage from './pages/SelectItemsPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/add-items" element={<AddItemsPage />} />
        <Route path="/select-items" element={<SelectItemsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
