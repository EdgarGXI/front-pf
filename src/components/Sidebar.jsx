"use client"

import { Link } from "react-router-dom"
import { MessageSquare, BarChart2, Info, Settings, HelpCircle } from "react-feather"

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col w-[130px] h-screen py-6 bg-primary text-white">
      <div className="flex items-center px-4 mb-8">
        <div className="w-8 h-8 mr-2 rounded-full bg-white flex items-center justify-center">
          <span className="text-primary font-bold text-xl">BC</span>
        </div>
        <span className="font-bold text-xl">BCIA</span>
      </div>

      <div className="flex-1 flex flex-col space-y-1">
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
    </div>
  )
}

const SidebarIcon = ({ icon, text, active = false, onClick, to }) => {
  const content = (
    <div
      className={`flex items-center px-4 py-3 ${active ? "bg-primary-dark" : ""} hover:bg-primary-dark transition-colors cursor-pointer`}
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>
      <span className="text-sm">{text}</span>
    </div>
  )

  return to ? (
    <Link to={to} className="w-full">
      {content}
    </Link>
  ) : (
    <div className="w-full">{content}</div>
  )
}

export default Sidebar
