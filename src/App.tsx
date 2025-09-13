import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPanel from "./pages/AdminPanel";
import SupabaseTest from "./components/SupabaseTest";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/test-supabase" element={<SupabaseTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
