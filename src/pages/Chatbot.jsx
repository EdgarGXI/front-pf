"use client"

import { useState, useRef, useEffect } from "react"
import ResourceCard from "../components/ResourceCard"
import { Search } from "react-feather"

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, I can provide general information about breast cancer. What would you like to know? Remember, I'm not a substitute for professional medical advice.",
      sender: "bot",
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null)

  const resources = [
    {
      title: "Screening Information",
      description: "Learn about mammograms and other screening methods for early detection",
      icon: "📋",
    },
    {
      title: "Risk Factors",
      description: "Understand factors that may increase breast cancer risk and prevention strategies",
      icon: "⚠️",
    },
    {
      title: "Support Resources",
      description: "Find support groups and resources for patients and caregivers",
      icon: "🤝",
    },
    {
      title: "Treatment Options",
      description: "Overview of current treatment approaches and clinical trials",
      icon: "💊",
    },
  ]

  const suggestedQuestions = [
    "What are common symptoms of breast cancer?",
    "How is breast cancer diagnosed?",
    "What are the risk factors for breast cancer?",
    "What screening methods are recommended?",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { id: Date.now(), text: input, sender: "user" }
    setMessages([...messages, userMessage])
    setInput("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(input),
        sender: "bot",
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleQuestionClick = (question) => {
    setInput(question)
    // Focus on input after setting the question
    document.getElementById("chat-input").focus()
  }

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase()

    if (input.includes("symptom")) {
      return "Common symptoms of breast cancer include a lump in the breast, changes in breast size or shape, skin changes, nipple discharge, and nipple inversion. However, many breast cancers have no obvious symptoms at first, which is why regular screening is important."
    } else if (input.includes("diagnos")) {
      return "Breast cancer is typically diagnosed through a combination of clinical breast exams, imaging tests (mammography, ultrasound, MRI), and biopsy. If a suspicious area is found, a biopsy will be performed to determine if cancer cells are present."
    } else if (input.includes("risk factor")) {
      return "Risk factors for breast cancer include being female, increasing age, personal or family history of breast cancer, inherited genes (BRCA1 and BRCA2), radiation exposure, obesity, beginning periods before age 12, starting menopause after age 55, having first child after age 30, and hormone therapy."
    } else if (input.includes("screening")) {
      return "Recommended screening methods include regular mammograms (typically starting at age 40-50 depending on guidelines), clinical breast exams by a healthcare provider, and breast self-awareness. High-risk individuals may need additional screening like MRI."
    } else {
      return "I'm here to provide information about breast cancer. You can ask about symptoms, diagnosis, risk factors, screening methods, treatment options, or support resources. How can I help you today?"
    }
  }

  return (
    <div className="flex flex-col h-full">
      <header className="bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Breast Cancer Information Assistant</h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col p-4 overflow-auto">
          <div className="flex-1 overflow-y-auto mb-4 p-4 bg-white rounded-lg shadow">
            <div className="flex flex-col">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message ${message.sender === "user" ? "user-message" : "bot-message"}`}
                >
                  {message.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-2">Suggested questions:</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  className="px-3 py-1 bg-primary-light text-white text-sm rounded-full hover:bg-primary transition"
                >
                  {question}
                </button>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                id="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about breast cancer..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="w-80 bg-white p-4 overflow-y-auto shadow-inner">
          <h2 className="text-xl font-bold mb-4">Helpful Resources</h2>
          <div className="space-y-4">
            {resources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                description={resource.description}
                icon={resource.icon}
              />
            ))}
          </div>

          <div className="mt-8 text-xs text-gray-500 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">Medical Disclaimer</h3>
            <p>
              This chatbot provides general information only and is not a substitute for professional medical advice.
              Always consult with qualified healthcare providers for medical concerns.
            </p>
          </div>

          <div className="mt-4 text-xs text-center text-gray-400">© 2025 Breast Cancer Information Assistant</div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
