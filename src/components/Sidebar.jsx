"use client"

import { Link } from "react-router-dom"
import { MessageSquare, BarChart2, Info } from "react-feather"

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col items-center w-16 h-screen py-8 bg-primary">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white mb-6">
        <span className="text-primary font-bold text-xl">BC</span>
      </div>

      <div className="flex-1 flex flex-col items-center">
        <SidebarIcon
          icon={<MessageSquare size={20} />}
          tooltip="Chatbot"
          active={activeTab === "chatbot"}
          onClick={() => setActiveTab("chatbot")}
          to="/chatbot"
        />

        <SidebarIcon
          icon={<BarChart2 size={20} />}
          tooltip="Dashboard"
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
          to="/dashboard"
        />

        <div className="mt-auto">
          <SidebarIcon icon={<Info size={20} />} tooltip="About" />
        </div>
      </div>
    </div>
  )
}

const SidebarIcon = ({ icon, tooltip, active = false, onClick, to }) => {
  const content = (
    <div className="group">
      <div className={`sidebar-icon ${active ? "bg-primary-light" : ""}`} onClick={onClick}>
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">{tooltip}</span>
      </div>
    </div>
  )

  return to ? <Link to={to}>{content}</Link> : content
}

export default Sidebar
