"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Paperclip,
  Send,
  X,
  AlertCircle,
  MessageCircle,
  FileText,
  Users,
  Settings,
  ChevronRight,
  Menu,
} from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, I can provide general information about breast cancer. What would you like to know? Remember, I'm not a substitute for professional medical advice.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Agregar estado para manejar la sesión
  const [sessionId, setSessionId] = useState(null);

  // Función para crear una nueva sesión
  const createNewSession = async () => {
    //https://apibeacon-fbb7bxf6fdbkd5dk.eastus2-01.azurewebsites.net/new_session/
    try {
      const response = await fetch(
        "https://apibeacon-fbb7bxf6fdbkd5dk.eastus2-01.azurewebsites.net/new_session/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSessionId(data.session_id);
        console.log("New session created:", data.session_id);
        return data.session_id;
      } else {
        console.error("Failed to create session");
        return null;
      }
    } catch (error) {
      console.error("Error creating session:", error);
      return null;
    }
  };

  // Función para cargar el historial de mensajes de una sesión
  const loadSessionHistory = async (sessionId) => {
    try {
      const response = await fetch(
        // http://localhost:8000/ https://apibeacon-fbb7bxf6fdbkd5dk.eastus2-01.azurewebsites.net/sessions/${sessionId}/messages/
        `https://apibeacon-fbb7bxf6fdbkd5dk.eastus2-01.azurewebsites.net/sessions/${sessionId}/messages/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Convertir los mensajes del backend al formato del frontend
        const formattedMessages = data.messages.map((msg, index) => ({
          id: index + 2, // Start from 2 to avoid conflict with initial bot message
          text: msg.content,
          sender: msg.role === "user" ? "user" : "bot",
        }));

        // Mantener el mensaje inicial y agregar el historial
        setMessages([
          {
            id: 1,
            text: "Hello, I can provide general information about breast cancer. What would you like to know? Remember, I'm not a substitute for professional medical advice.",
            sender: "bot",
          },
          ...formattedMessages,
        ]);
      }
    } catch (error) {
      console.error("Error loading session history:", error);
    }
  };

  // Función para limpiar la sesión actual
  const clearSession = async () => {
    if (!sessionId) return;

    try {
      const response = await fetch(
        //https://apibeacon-fbb7bxf6fdbkd5dk.eastus2-01.azurewebsites.net/sessions/${sessionId}/
        `https://apibeacon-fbb7bxf6fdbkd5dk.eastus2-01.azurewebsites.net/sessions/${sessionId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Resetear mensajes al estado inicial
        setMessages([
          {
            id: 1,
            text: "Hello, I can provide general information about breast cancer. What would you like to know? Remember, I'm not a substitute for professional medical advice.",
            sender: "bot",
          },
        ]);
        console.log("Session cleared successfully");
      }
    } catch (error) {
      console.error("Error clearing session:", error);
    }
  };

  // Inicializar sesión al cargar el componente
  useEffect(() => {
    const initializeSession = async () => {
      // Verificar si hay una sesión guardada en localStorage
      const savedSessionId = localStorage.getItem("chatbot_session_id");

      if (savedSessionId) {
        setSessionId(savedSessionId);
        // Cargar historial de mensajes
        await loadSessionHistory(savedSessionId);
      } else {
        // Crear nueva sesión
        const newSessionId = await createNewSession();
        if (newSessionId) {
          localStorage.setItem("chatbot_session_id", newSessionId);
        }
      }
    };

    initializeSession();
  }, []);

  // Nuevo useEffect para limpiar la sesión cuando se cierre la pestaña
  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (sessionId) {
        // Limpiar la sesión del backend
        try {
          await fetch(
            //https://apibeacon-fbb7bxf6fdbkd5dk.eastus2-01.azurewebsites.net/sessions/${sessionId}/
            `https://apibeacon-fbb7bxf6fdbkd5dk.eastus2-01.azurewebsites.net/sessions/${sessionId}/`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Session cleared on page unload");
        } catch (error) {
          console.error("Error clearing session on page unload:", error);
        }

        // Limpiar localStorage
        localStorage.removeItem("chatbot_session_id");
      }
    };

    // Agregar el evento listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup: remover el evento listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [sessionId]);

  const resources = [
    {
      title: "Screening Information",
      description:
        "Learn about mammograms and other screening methods for early detection",
      icon: "📋",
      link: "https://www.mayoclinic.org/diseases-conditions/breast-cancer/diagnosis-treatment/drc-20352475#:~:text=During%20a%20clinical%20breast%20exam,around%20the%20armpits%20for%20lumps.",
    },
    {
      title: "Risk Factors",
      description:
        "Understand factors that may increase breast cancer risk and prevention strategies",
      icon: "⚠️",
      link: "https://www.sciencedirect.com/science/article/abs/pii/S1877782122000339?via%3Dihub",
    },
    {
      title: "Support Resources",
      description:
        "Find support groups and resources for patients and caregivers",
      icon: "🤝",
      link: "https://www.breastcancer.org/treatment/complementary-therapy/types/support-groups",
    },
    {
      title: "Treatment Options",
      description:
        "Overview of current treatment approaches and clinical trials",
      icon: "💊",
      link: "https://www.breastcancer.org/treatment?gad_campaignid=2187230",
    },
  ];

  const suggestedQuestions = [
    "What are common symptoms of breast cancer?",
    "How is breast cancer diagnosed?",
    "What are the risk factors for breast cancer?",
    "What screening methods are recommended?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add invisible scrollbar styles to the document head
  useEffect(() => {
    const style = document.createElement("style");
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
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
    console.log("Files selected:", files);
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const processMammogramImage = async (file, question = "") => {
    if (
      !file ||
      (!file.type.startsWith("image/") &&
        !file.name.toLowerCase().endsWith(".dcm") &&
        !file.name.toLowerCase().endsWith(".dicom"))
    ) {
      return {
        success: false,
        message: "Please upload a valid image or DICOM (.dcm, .dicom) file",
      };
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "question",
        question || "Please explain the results of this mammogram."
      );

      // Agregar session_id al FormData
      if (sessionId) {
        formData.append("session_id", sessionId);
      }

      // First check if the API is running
      try {
        const healthCheck = await fetch(
          // http://localhost:8000/ https://apibeacon-fbb7bxf6fdbkd5dk.eastus2-01.azurewebsites.net/
          "https://apibeacon-fbb7bxf6fdbkd5dk.eastus2-01.azurewebsites.net/",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!healthCheck.ok) {
          console.warn("API health check failed");
        } else {
          console.log("API health check succeeded");
        }
      } catch (error) {
        console.error("API health check failed:", error);
      }

      // Send the image to your FastAPI endpoint
      console.log("Sending image to API...");
      const response = await fetch(
        // http://localhost:8000/ https://apibeacon-fbb7bxf6fdbkd5dk.eastus2-01.azurewebsites.net/predict/
        "https://apibeacon-fbb7bxf6fdbkd5dk.eastus2-01.azurewebsites.net/predict/",
        {
          method: "POST",
          body: formData,
          // Do not set Content-Type header when sending FormData
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response received:", data);

      // Actualizar session_id si se devuelve uno nuevo
      if (data.session_id && data.session_id !== sessionId) {
        setSessionId(data.session_id);
        localStorage.setItem("chatbot_session_id", data.session_id);
      }

      return {
        success: true,
        data: data,
        message: "Image analysis complete",
      };
    } catch (error) {
      console.error("Error processing image:", error);
      return {
        success: false,
        message: `Error with output: ${error.message}.`,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const getClassLabel = (classId) => {
    // Map class IDs to labels based on your YOLO model's classes
    const labels = {
      0: "Malignant",
      1: "Benign",
      // Add more classes as needed
    };
    return labels[classId] || `Class ${classId}`;
  };

  const renderPredictionResults = (data) => {
    if (!data) return "No prediction results available";

    // Show annotated image if present
    const imageHtml = data.annotated_image_base64
      ? `<img src="data:image/jpeg;base64,${data.annotated_image_base64}" alt="Annotated mammogram" class="max-w-full rounded-lg border border-gray-200 shadow-sm" />`
      : "";

    // Show detection result and explanation if present
    const detectionResult = data.detection_result
      ? `<div class="font-semibold mb-2">${data.detection_result}</div>`
      : "";

    const explanation = data.explanation
      ? `<div class="mt-2 text-gray-700">${data.explanation}</div>`
      : "";

    // Show bounding box results if present
    let predictions = "";
    if (
      data.results &&
      Array.isArray(data.results) &&
      data.results.length > 0
    ) {
      predictions =
        `<div class="mt-3">
        <h4 class="font-semibold text-lg mb-2">Findings:</h4>` +
        data.results
          .map(
            (pred, index) =>
              `<div class="p-3 border rounded-lg mb-2 bg-gray-50">
              <strong>Finding ${index + 1}:</strong> ${getClassLabel(
                pred.class
              )}
              <br/>
              <strong>Confidence:</strong> ${(pred.confidence * 100).toFixed(
                2
              )}%
            </div>`
          )
          .join("") +
        `</div>`;
    }

    return `
    <div class="mt-4">
      <div class="mb-3">${imageHtml}</div>
      ${detectionResult}
      ${predictions}
      ${explanation}
      <div class="mt-3 text-gray-500 text-xs italic bg-gray-50 p-2 rounded-lg border border-gray-200">
        Note: This is an AI-assisted analysis and should be reviewed by a healthcare professional.
      </div>
    </div>
  `;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Check if there's text input or files to process
    if (!input.trim() && uploadedFiles.length === 0) return;

    // Create a variable to track whether we need to add any responses
    let responseNeeded = false;

    // Add user message if there's text input
    if (input.trim()) {
      const userMessage = { id: Date.now(), text: input, sender: "user" };
      setMessages([...messages, userMessage]);
      responseNeeded = true;
    }

    // Process any uploaded images
    if (uploadedFiles.length > 0) {
      // Show a message indicating file upload
      const fileMessage = {
        id: Date.now() + 1,
        text: `Uploading ${uploadedFiles.length} file(s) for analysis...`,
        sender: "user",
        isFileUpload: true,
      };
      setMessages((prev) => [...prev, fileMessage]);

      // Process each file
      for (const file of uploadedFiles) {
        // Accept image files or DICOM files by extension
        const isImage = file.type.startsWith("image/");
        const isDicom =
          file.name.toLowerCase().endsWith(".dcm") ||
          file.name.toLowerCase().endsWith(".dicom");

        if (isImage || isDicom) {
          try {
            const result = await processMammogramImage(file, input);

            let botResponse;
            if (result.success) {
              botResponse = {
                id: Date.now() + 2,
                text: `<div>
            <p>I've analyzed the mammogram image:</p>
            ${renderPredictionResults(result.data)}
          </div>`,
                sender: "bot",
                isHTML: true,
              };
            } else {
              botResponse = {
                id: Date.now() + 2,
                text: result.message,
                sender: "bot",
              };
            }

            setMessages((prev) => [...prev, botResponse]);
          } catch (error) {
            console.error("Error during image processing:", error);
            const errorResponse = {
              id: Date.now() + 2,
              text: `There was an error processing your image: ${error.message}.`,
              sender: "bot",
            };
            setMessages((prev) => [...prev, errorResponse]);
          }
          break; // Only process one file for now
        }
      }

      // Clear the uploaded files after processing
      setUploadedFiles([]);
      responseNeeded = false; // We've already added responses for the files
    }

    // Clear the input field
    setInput("");

    // Only provide a chatbot response if text was entered and we need to respond to it
    if (responseNeeded) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("question", input);

        // Agregar session_id al FormData
        if (sessionId) {
          formData.append("session_id", sessionId);
        }

        const apiResponse = await fetch(
          // http://localhost:8000/ https://apibeacon-fbb7bxf6fdbkd5dk.eastus2-01.azurewebsites.net/predict/
          "https://apibeacon-fbb7bxf6fdbkd5dk.eastus2-01.azurewebsites.net/predict/",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await apiResponse.json();

        // Actualizar session_id si se devuelve uno nuevo
        if (data.session_id && data.session_id !== sessionId) {
          setSessionId(data.session_id);
          localStorage.setItem("chatbot_session_id", data.session_id);
        }

        const botResponse = {
          id: Date.now() + 3,
          text: data.response || "Sorry, I couldn't find an answer.",
          sender: "bot",
        };
        setMessages((prev) => [...prev, botResponse]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 3,
            text: "There was an error contacting the API.",
            sender: "bot",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleQuestionClick = (question) => {
    setInput(question);
    // Focus on input after setting the question
    document.getElementById("chat-input").focus();
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    if (input.includes("symptom")) {
      return "Common symptoms of breast cancer include a lump in the breast, changes in breast size or shape, skin changes, nipple discharge, and nipple inversion. However, many breast cancers have no obvious symptoms at first, which is why regular screening is important.";
    } else if (input.includes("diagnos")) {
      return "Breast cancer is typically diagnosed through a combination of clinical breast exams, imaging tests (mammography, ultrasound, MRI), and biopsy. If a suspicious area is found, a biopsy will be performed to determine if cancer cells are present.";
    } else if (input.includes("risk factor")) {
      return "Risk factors for breast cancer include being female, increasing age, personal or family history of breast cancer, inherited genes (BRCA1 and BRCA2), radiation exposure, obesity, beginning periods before age 12, starting menopause after age 55, having first child after age 30, and hormone therapy.";
    } else if (input.includes("screening")) {
      return "Recommended screening methods include regular mammograms (typically starting at age 40-50 depending on guidelines), clinical breast exams by a healthcare provider, and breast self-awareness. High-risk individuals may need additional screening like MRI.";
    } else if (
      input.includes("detection") ||
      input.includes("analyze") ||
      input.includes("mammogram")
    ) {
      return "You can upload a mammogram image using the paperclip icon, and I'll analyze it using our AI detection system. Please note that this analysis is for informational purposes only and should be reviewed by a healthcare professional.";
    } else {
      return "I'm here to provide information about breast cancer. You can ask about symptoms, diagnosis, risk factors, screening methods, treatment options, or support resources. You can also upload a mammogram image for AI-assisted analysis. How can I help you today?";
    }
  };

  // Custom component to render messages with HTML content
  const MessageContent = ({ message }) => {
    if (message.isHTML) {
      return <div dangerouslySetInnerHTML={{ __html: message.text }} />;
    }
    return <div>{message.text}</div>;
  };

  const ResourceCard = ({ title, description, icon, link }) => {
    const handleResourceClick = () => {
      // You can add any custom logic here before navigation
      console.log(`Navigating to: ${link}`);
      window.location.href = link;
    };

    return (
      <div
        className="flex items-start gap-3 p-3 sm:p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all cursor-pointer"
        onClick={handleResourceClick}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleResourceClick();
          }
        }}
      >
        <div className="text-xl sm:text-2xl">{icon}</div>
        <div>
          <h3 className="font-semibold text-blue-700 mb-1 text-sm sm:text-base">
            {title}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    );
  };

  // Navigation tabs component for mobile

  // Sidebar for mobile
  const MobileSidebar = () => (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        isSidebarOpen ? "block" : "hidden"
      }`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-bold text-gray-800">Helpful Resources</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {resources.map((resource, index) => (
            <ResourceCard
              key={index}
              title={resource.title}
              description={resource.description}
              icon={resource.icon}
              link={resource.link}
            />
          ))}

          <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-sm mb-1">Medical Disclaimer</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  This chatbot provides general information only and is not a
                  substitute for professional medical advice. Always consult
                  with qualified healthcare providers for medical concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="bg-white p-3 sm:p-4 border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Breast Cancer Detection Assistant
          </h1>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search - Hidden on mobile */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-48 lg:w-64 px-4 py-2 pr-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full p-2 sm:p-4 gap-2 sm:gap-4">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeTab === "chat" && (
            <div className="flex-1 flex flex-col overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-800 text-sm sm:text-base">
                      AI Assistant
                    </h2>
                    <p className="text-xs text-gray-500">
                      Ask questions about breast cancer or upload mammograms for
                      analysis
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages container with invisible scrollbar */}
              <div className="flex-1 overflow-y-auto invisible-scrollbar p-3 sm:p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-xl text-sm ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                          : "bg-white border border-gray-200 shadow-sm"
                      }`}
                    >
                      <MessageContent message={message} />
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 sm:p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-1 animate-pulse"></div>
                        <div
                          className="w-2 h-2 bg-blue-600 rounded-full mr-1 animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                        <span className="ml-2 text-sm text-gray-500">
                          Loading...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
                <div className="w-full space-y-3 sm:space-y-4">
                  {/* Suggested questions - scrollable on mobile */}
                  <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-x-visible sm:pb-0">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        className="px-3 py-1 text-xs sm:text-sm rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity shadow-sm whitespace-nowrap flex-shrink-0 sm:flex-shrink"
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
                          className="pl-3 pr-1 py-1 flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full text-sm"
                        >
                          <span className="truncate max-w-[100px] sm:max-w-[150px] text-blue-700">
                            {file.name}
                          </span>
                          <button
                            className="h-5 w-5 rounded-full hover:bg-blue-100 flex items-center justify-center"
                            onClick={() =>
                              setUploadedFiles(
                                uploadedFiles.filter((_, i) => i !== index)
                              )
                            }
                          >
                            <X className="h-3 w-3 text-blue-700" />
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
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-sm"
                      />
                      <button
                        type="button"
                        onClick={triggerFileUpload}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 flex items-center justify-center"
                        title="Upload mammogram image"
                      >
                        <Paperclip className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        accept="image/*,.dcm,.dicom"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl flex items-center justify-center shadow-sm text-sm sm:text-base ${
                        isLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white"
                      }`}
                    >
                      {isLoading ? (
                        <span className="hidden sm:inline">Processing...</span>
                      ) : (
                        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === "resources" && (
            <div className="flex-1 flex flex-col overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-800 text-sm sm:text-base">
                      Helpful Resources
                    </h2>
                    <p className="text-xs text-gray-500">
                      Educational materials and support for breast cancer
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {resources.map((resource, index) => (
                    <ResourceCard
                      key={index}
                      title={resource.title}
                      description={resource.description}
                      icon={resource.icon}
                      link={resource.link}
                    />
                  ))}
                </div>

                <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Understanding Breast Cancer
                  </h3>
                  <p className="text-gray-700 mb-4 text-sm sm:text-base">
                    Breast cancer is one of the most common cancers affecting
                    women worldwide. Early detection through regular screening
                    and awareness of symptoms can significantly improve
                    outcomes.
                  </p>
                  <div className="grid grid-cols-1 gap-4 mt-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="font-bold text-blue-700 mb-2 text-sm sm:text-base">
                        Early Detection
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Regular mammograms are the most effective way to detect
                        breast cancer early, often before symptoms appear.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="font-bold text-purple-700 mb-2 text-sm sm:text-base">
                        Treatment Advances
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Modern treatments are increasingly personalized, based
                        on the specific type of breast cancer and genetic
                        factors.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1 text-sm sm:text-base">
                        Medical Disclaimer
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        This chatbot provides general information only and is
                        not a substitute for professional medical advice. Always
                        consult with qualified healthcare providers for medical
                        concerns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === "community" || activeTab === "settings") && (
            <div className="flex-1 flex flex-col overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                    {activeTab === "community" ? (
                      <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-800 text-sm sm:text-base">
                      {activeTab === "community" ? "Community" : "Settings"}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {activeTab === "community"
                        ? "Connect with others in the breast cancer community"
                        : "Configure your assistant preferences"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
                <div className="text-center">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {activeTab === "community" ? (
                      <Users className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                    ) : (
                      <Settings className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    {activeTab === "community"
                      ? "Community Coming Soon"
                      : "Settings Coming Soon"}
                  </h3>
                  <p className="text-gray-600 max-w-md text-sm sm:text-base px-4">
                    {activeTab === "community"
                      ? "We're working on building a supportive community. Check back soon for updates!"
                      : "Additional configuration options will be available in a future update."}
                  </p>
                  <button
                    className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
                    onClick={() => setActiveTab("chat")}
                  >
                    Return to Chat
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Only visible on larger screens */}
        <div className="w-80 hidden lg:block">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <h2 className="font-bold text-gray-800">Helpful Resources</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {resources.map((resource, index) => (
                <ResourceCard
                  key={index}
                  title={resource.title}
                  description={resource.description}
                  icon={resource.icon}
                  link={resource.link}
                />
              ))}

              <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm mb-1">
                      Medical Disclaimer
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      This chatbot provides general information only and is not
                      a substitute for professional medical advice. Always
                      consult with qualified healthcare providers for medical
                      concerns.
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

      {/* Mobile Sidebar */}
      <MobileSidebar />
    </div>
  );
};

export default Chatbot;
