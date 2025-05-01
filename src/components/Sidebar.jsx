"use client"

import { Link } from "react-router-dom"
import { MessageSquare, BarChart2, Info, Settings, HelpCircle } from "react-feather"

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col items-center w-16 h-screen py-8 bg-primary">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white mb-6">
        <span className="text-primary font-bold text-xl">BC</span>
      </div>

      <SidebarIcon
        icon={<MessageSquare size={20} />}
        text="Chatbot"
        active={activeTab === "chatbot"}
        onClick={() => setActiveTab("chatbot")}
        to="/chatbot"
      />

      <SidebarIcon
        icon={<BarChart2 size={20} />}
        text="Dashboard"
        active={activeTab === "dashboard"}
        onClick={() => setActiveTab("dashboard")}
        to="/dashboard"
      />

      <div className="mt-auto">
        <SidebarIcon icon={<Info size={20} />} text="About" />
        <SidebarIcon icon={<HelpCircle size={20} />} text="Help" />
        <SidebarIcon icon={<Settings size={20} />} text="Settings" />
      </div>
    </div>
  )
}

const SidebarIcon = ({ icon, text, active = false, onClick, to }) => {
  const content = (
    <>
      <div className={`sidebar-icon ${active ? "bg-primary-light rounded-xl" : ""}`} onClick={onClick}>
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
      </div>
    </>
  )

  return to ? (
    <Link to={to} className="group">
      {content}
    </Link>
  ) : (
    <div className="group">{content}</div>
  )
}

export default Sidebar
