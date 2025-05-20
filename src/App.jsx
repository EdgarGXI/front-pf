"use client";

import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Chatbot from "./pages/Chatbot";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("chatbot");

  return (
    <Router>
      <div className="flex h-screen w-full bg-gray-50">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/chatbot" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
