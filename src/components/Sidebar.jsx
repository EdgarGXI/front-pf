"use client"

import { Link } from "react-router-dom"
import { MessageSquare, BarChart2, Info, Users, Settings, Home } from "react-feather"

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-sm">
      {/* Logo Section */}
      <div className="p-4 flex justify-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">
          <span className="text-white font-bold text-xl">BC</span>
        </div>
      </div>


      {/* Navigation Icons */}
      <div className="pt-20 flex-1 flex flex-col items-center px-2 py-4 space-y-4 ">
     

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

        <SidebarIcon
          icon={<Users size={20} />}
          tooltip="Community"
          active={activeTab === "community"}
          onClick={() => setActiveTab("community")}
          to="https://www.breastcancer.org/es"
        />

         <SidebarIcon
          icon={<Info size={20} />}
          tooltip="About"
          active={activeTab === "about"}
          onClick={() => setActiveTab("about")}
          to="/about"
            />
      </div>

    
    </div>
  )
}

const SidebarIcon = ({ icon, tooltip, active = false, onClick, to }) => {
  const baseClasses =
    "relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 cursor-pointer"

  const activeClasses = active
    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
    : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 shadow-sm"

  const content = (
    <div className="group">
      <div className={`${baseClasses} ${activeClasses}`} onClick={onClick}>
        {icon}
        <span className="absolute left-full ml-4 px-2 py-1 text-sm font-medium text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
          {tooltip}
        </span>
      </div>
    </div>
  )

  return to ? <Link to={to}>{content}</Link> : content
}

// Versión expandida con texto
const ExpandedSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col h-screen w-64 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-sm">
      {/* Logo Section */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">
            <span className="text-white font-bold text-lg">BC</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-800">Breast Cancer</h1>
            <p className="text-xs text-gray-500">Detection Assistant</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 my-2 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1">
        <ExpandedNavLink
          icon={<Home size={18} />}
          label="Home"
          active={activeTab === "home"}
          onClick={() => setActiveTab("home")}
          to="/"
        />

        <ExpandedNavLink
          icon={<MessageSquare size={18} />}
          label="Chatbot"
          active={activeTab === "chatbot"}
          onClick={() => setActiveTab("chatbot")}
          to="/chatbot"
        />

        <ExpandedNavLink
          icon={<BarChart2 size={18} />}
          label="Dashboard"
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
          to="/dashboard"
        />

        <ExpandedNavLink
          icon={<Users size={18} />}
          label="Community"
          active={activeTab === "community"}
          onClick={() => setActiveTab("community")}
          to="/community"
        />
      </div>

      {/* Bottom Links */}
      <div className="px-3 py-4 space-y-1 border-t border-gray-100">
        <ExpandedNavLink
          icon={<Settings size={18} />}
          label="Settings"
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
          to="/settings"
        />

        <ExpandedNavLink
          icon={<Info size={18} />}
          label="About"
          active={activeTab === "about"}
          onClick={() => setActiveTab("about")}
          to="/about"
        />
      </div>
    </div>
  )
}

const ExpandedNavLink = ({ icon, label, active = false, onClick, to }) => {
  const baseClasses = "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer"

  const activeClasses = active
    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm"
    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"

  const content = (
    <div className={`${baseClasses} ${activeClasses}`} onClick={onClick}>
      <span className="flex-shrink-0">{icon}</span>
      <span className="font-medium">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>}
    </div>
  )

  return to ? (
    <Link to={to} className="block">
      {content}
    </Link>
  ) : (
    content
  )
}

// Responsive Sidebar that switches between collapsed and expanded
const ResponsiveSidebar = ({ activeTab, setActiveTab, isExpanded, toggleExpanded }) => {
  return isExpanded ? (
    <ExpandedSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
  ) : (
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
  )
}

export { Sidebar, ExpandedSidebar, ResponsiveSidebar }
export default Sidebar
