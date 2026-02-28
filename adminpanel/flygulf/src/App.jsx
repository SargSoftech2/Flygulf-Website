import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ContactEnquiries from "./admin/contactEnquiry";

import { useState } from "react";
import GalleryAdmin from "./components/GalleryAdmin";
function App() {
  const [count, setCount] = useState(0);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/contactenquiry" element={<ContactEnquiries />} />

             <Route path="/gallary" element={<GalleryAdmin />} />

      </Routes>
    </Router>
  );
}

export default App;