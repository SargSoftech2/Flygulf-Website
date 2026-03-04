import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ContactEnquiries from "./admin/contactEnquiry";

import CenterAddress from "./admin/centerAddress";

import { useState } from "react";
import GalleryAdmin from "./components/GalleryAdmin";

import CoursesPage from "./admin/coursesPage";
function App() {
  const [count, setCount] = useState(0);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
           {/* ✅ Added Courses */}
        <Route path="/courses" element={<CoursesPage />} />

        <Route path="/contactenquiry" element={<ContactEnquiries />} />
         <Route path="/centeraddress" element={<CenterAddress />} />

             <Route path="/gallary" element={<GalleryAdmin />} />

      </Routes>
    </Router>
  );
}

export default App;