"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Paperclip, Send, X, AlertCircle } from "lucide-react"

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
  const [uploadedFiles, setUploadedFiles] = useState([])
  const fileInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  const resources = [
    {
      title: "Screening Information",
      description: "Learn about mammograms and other screening methods for early detection",
      icon: "📋",
      link: "/screening-info",
    },
    {
      title: "Risk Factors",
      description: "Understand factors that may increase breast cancer risk and prevention strategies",
      icon: "⚠️",
      link: "/risk-factors",
    },
    {
      title: "Support Resources",
      description: "Find support groups and resources for patients and caregivers",
      icon: "🤝",
      link: "/support-resources",
    },
    {
      title: "Treatment Options",
      description: "Overview of current treatment approaches and clinical trials",
      icon: "💊",
      link: "/treatment-options",
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

  // Add invisible scrollbar styles to the document head
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      .invisible-scrollbar::-webkit-scrollbar {
        width: 0;
        height: 0;
        display: none;
      }

      .invisible-scrollbar {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
      }
      
      /* For touch devices - ensure good scroll area */
      @media (pointer: coarse) {
        .invisible-scrollbar {
          -webkit-overflow-scrolling: touch;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    setUploadedFiles([...uploadedFiles, ...files])
    console.log("Files selected:", files)
  }

  const triggerFileUpload = () => {
    fileInputRef.current.click()
  }

  const processMammogramImage = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      return {
        success: false,
        message: "Please upload a valid image file",
      }
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      // First check if the API is running
      try {
        const healthCheck = await fetch("http://127.0.0.1:8000/", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })

        if (!healthCheck.ok) {
          console.warn("API health check failed")
        } else {
          console.log("API health check succeeded")
        }
      } catch (error) {
        console.error("API health check failed:", error)
      }

      // Send the image to your FastAPI endpoint
      console.log("Sending image to API...")
      const response = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        body: formData,
        headers: {
          // Do not set Content-Type header when sending FormData
          // The browser will set it including the boundary
        },
      })

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`)
      }

      const data = await response.json()
      console.log("API response received:", data)

      return {
        success: true,
        data: data,
        message: "Image analysis complete",
      }
    } catch (error) {
      console.error("Error processing image:", error)
      return {
        success: false,
        message: `Error analyzing image: ${error.message}. Make sure the API server is running at http://127.0.0.1:8000`,
      }
    } finally {
      setIsLoading(false)
    }
  }

  const getClassLabel = (classId) => {
    // Map class IDs to labels based on your YOLO model's classes
    const labels = {
      0: "Malignant",
      1: "Benign",
      // Add more classes as needed
    }
    return labels[classId] || `Class ${classId}`
  }

  const renderPredictionResults = (data) => {
    if (!data || !data.results) return "No prediction results available"

    // Extract prediction details
    const predictions = data.results
      .map((pred, index) => {
        const className = getClassLabel(pred.class)
        const confidence = (pred.confidence * 100).toFixed(2)

        return `
        <div class="p-3 border rounded-lg mb-2 bg-gray-50">
          <strong>Finding ${index + 1}:</strong> ${className}
          <br/>
          <strong>Confidence:</strong> ${confidence}%
        </div>
      `
      })
      .join("")

    // Create HTML with the image and predictions
    return `
      <div class="mt-4">
        <div class="mb-3">
          <img 
            src="data:image/jpeg;base64,${data.annotated_image_base64}" 
            alt="Annotated mammogram" 
            class="max-w-full rounded-lg border border-gray-200 shadow-sm"
          />
        </div>
        <div class="mt-3">
          <h4 class="font-semibold text-lg mb-2">Analysis Results:</h4>
          ${predictions}
        </div>
        <div class="mt-3 text-gray-500 text-xs italic bg-gray-50 p-2 rounded-lg border border-gray-200">
          Note: This is an AI-assisted analysis and should be reviewed by a healthcare professional.
        </div>
      </div>
    `
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()

    // Check if there's text input or files to process
    if (!input.trim() && uploadedFiles.length === 0) return

    // Create a variable to track whether we need to add any responses
    let responseNeeded = false

    // Add user message if there's text input
    if (input.trim()) {
      const userMessage = { id: Date.now(), text: input, sender: "user" }
      setMessages([...messages, userMessage])
      responseNeeded = true
    }

    // Process any uploaded images
    if (uploadedFiles.length > 0) {
      // Show a message indicating file upload
      const fileMessage = {
        id: Date.now() + 1,
        text: `Uploading ${uploadedFiles.length} file(s) for analysis...`,
        sender: "user",
        isFileUpload: true,
      }
      setMessages((prev) => [...prev, fileMessage])

      // Process each file
      for (const file of uploadedFiles) {
        // For now, we'll only process the first image file
        if (file.type.startsWith("image/")) {
          try {
            const result = await processMammogramImage(file)

            let botResponse
            if (result.success) {
              botResponse = {
                id: Date.now() + 2,
                text: `<div>
                  <p>I've analyzed the mammogram image:</p>
                  ${renderPredictionResults(result.data)}
                </div>`,
                sender: "bot",
                isHTML: true,
              }
            } else {
              botResponse = {
                id: Date.now() + 2,
                text: result.message,
                sender: "bot",
              }
            }

            setMessages((prev) => [...prev, botResponse])
          } catch (error) {
            console.error("Error during image processing:", error)
            const errorResponse = {
              id: Date.now() + 2,
              text: `There was an error processing your image: ${error.message}. Please make sure the API server is running at http://127.0.0.1:8000`,
              sender: "bot",
            }
            setMessages((prev) => [...prev, errorResponse])
          }
          break // Only process one image for now
        }
      }

      // Clear the uploaded files after processing
      setUploadedFiles([])
      responseNeeded = false // We've already added responses for the files
    }

    // Clear the input field
    setInput("")

    // Only provide a chatbot response if text was entered and we need to respond to it
    if (responseNeeded) {
      // Simulate bot response after a short delay
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 3,
          text: getBotResponse(input),
          sender: "bot",
        }
        setMessages((prev) => [...prev, botResponse])
      }, 1000)
    }
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
    } else if (input.includes("detection") || input.includes("analyze") || input.includes("mammogram")) {
      return "You can upload a mammogram image using the paperclip icon, and I'll analyze it using our AI detection system. Please note that this analysis is for informational purposes only and should be reviewed by a healthcare professional."
    } else {
      return "I'm here to provide information about breast cancer. You can ask about symptoms, diagnosis, risk factors, screening methods, treatment options, or support resources. You can also upload a mammogram image for AI-assisted analysis. How can I help you today?"
    }
  }

  // Custom component to render messages with HTML content
  const MessageContent = ({ message }) => {
    if (message.isHTML) {
      return <div dangerouslySetInnerHTML={{ __html: message.text }} />
    }
    return <div>{message.text}</div>
  }

  const ResourceCard = ({ title, description, icon, link }) => {
    const handleResourceClick = () => {
      // You can add any custom logic here before navigation
      console.log(`Navigating to: ${link}`)
      window.location.href = link
    }
    
    return (
              <div 
          className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all cursor-pointer"
          onClick={handleResourceClick}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleResourceClick()
            }
          }}
        >
        <div className="text-2xl">{icon}</div>
        <div>
          <h3 className="font-semibold text-primary mb-1">{title}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Make sure we have padding for touch interfaces where scrollbars are hidden */}
      <style jsx>{`
        .messages-container {
          scrollbar-gutter: stable;
          padding-right: 12px;  /* Add padding for hidden scrollbar space */
        }
      `}</style>

      <header className="bg-white p-4 border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary"> Breast Evaluation Assistant with Convolutional Networks </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search something here..."
              className="w-64 px-4 py-2 pr-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full p-4 gap-4">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden bg-white rounded-lg border border-gray-200 shadow-sm">
            {/* Modified messages container with invisible scrollbar */}
            <div className="flex-1 overflow-y-auto invisible-scrollbar messages-container p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.sender === "user" ? "bg-primary text-white" : "bg-white border border-gray-200 shadow-sm"
                    }`}
                  >
                    <MessageContent message={message} />
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-1 animate-pulse"></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full mr-1 animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                      <span className="ml-2 text-sm text-gray-500">Analyzing image...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="w-full space-y-4">
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="px-3 py-1 text-sm rounded-full bg-primary-light text-white hover:bg-primary transition-colors"
                      onClick={() => handleQuestionClick(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="pl-2 pr-1 py-1 flex items-center gap-1 bg-gray-100 rounded-full text-sm"
                      >
                        <span className="truncate max-w-[150px]">{file.name}</span>
                        <button
                          className="h-5 w-5 rounded-full hover:bg-gray-200 flex items-center justify-center"
                          onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      id="chat-input"
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about breast cancer or upload a mammogram..."
                      className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={triggerFileUpload}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100 flex items-center justify-center"
                      title="Upload mammogram image"
                    >
                      <Paperclip className="h-4 w-4" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-lg flex items-center justify-center ${
                      isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary-dark text-white"
                    }`}
                  >
                    {isLoading ? "Processing..." : <Send className="h-4 w-4" />}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="w-80 hidden md:block">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-primary">Helpful Resources</h2>
            </div>
            <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto invisible-scrollbar">
              {resources.map((resource, index) => (
                <ResourceCard
                  key={index}
                  title={resource.title}
                  description={resource.description}
                  icon={resource.icon}
                  link={resource.link}
                />
              ))}

              <div className="my-6 h-px bg-gray-200"></div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm mb-1">Medical Disclaimer</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      This chatbot provides general information only and is not a substitute for professional medical
                      advice. Always consult with qualified healthcare providers for medical concerns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 text-xs text-center text-gray-400 border-t border-gray-100">
              © 2025 Breast Cancer Information Assistant
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot