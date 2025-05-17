"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import reportImg from '../imgs/report.jpg';
import matrixImg from '../imgs/matrix.jpeg';


import {
  BarChart3,
  PieChart,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  LineChart,
  Brain,
  Database,
} from "lucide-react"

export default function ProjectInformation() {
  const [expandedSection, setExpandedSection] = useState(null)
  const [activeTab, setActiveTab] = useState("cards")

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 bg-gradient-to-b ">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Breast Cancer Detection Model
        </h1>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-500 text-white">
            75% Accuracy
          </span>
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-500 text-white">
            Validated
          </span>
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-500 text-white">
            Deep Learning
          </span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Advanced performance metrics and validation results</p>
      </div>

      {/* Tabs */}
      <div className="w-full mb-8">
        <div className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 rounded-lg overflow-hidden border">
          <button
            onClick={() => setActiveTab("cards")}
            className={`text-base py-3 flex items-center justify-center ${activeTab === "cards"
              ? "bg-white text-gray-900 border-b-2 border-blue-500"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Performance Metrics
          </button>
          <button
            onClick={() => setActiveTab("detailed")}
            className={`text-base py-3 flex items-center justify-center ${activeTab === "detailed"
              ? "bg-white text-gray-900 border-b-2 border-blue-500"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
          >
            <PieChart className="mr-2 h-4 w-4" />
            Detailed Analysis
          </button>
        </div>

        {/* Cards Tab Content */}
        {activeTab === "cards" && (
          <div className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Validation Metrics Card */}
              <div className=" flex flex-col justify-between overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="pb-2 border-b p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-blue-50">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Validation Metrics</h3>
                    </div>
                    <span className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      Performance
                    </span>
                  </div>
                  <p className="text-gray-500 mt-2">Key performance indicators from our validation process</p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 flex flex-col">
                      <div className="text-sm text-gray-500 mb-1">Accuracy</div>
                      <div className="text-3xl font-bold text-blue-700">75%</div>
                      <div className="mt-2 flex items-center text-xs text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span>+2.3% from baseline</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100 flex flex-col">
                      <div className="text-sm text-gray-500 mb-1">Precision</div>
                      <div className="text-3xl font-bold text-purple-700">85%</div>
                      <div className="mt-2 flex items-center text-xs text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span>+1.8% from baseline</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-100 flex flex-col">
                      <div className="text-sm text-gray-500 mb-1">Recall</div>
                      <div className="text-3xl font-bold text-pink-700">75%</div>
                      <div className="mt-2 flex items-center text-xs text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span>+3.2% from baseline</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-100 flex flex-col">
                      <div className="text-sm text-gray-500 mb-1">F1 Score</div>
                      <div className="text-3xl font-bold text-amber-700">76%</div>
                      <div className="mt-2 flex items-center text-xs text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span>+2.5% from baseline</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="font-medium text-gray-700 flex items-center">
                        <LineChart className="h-4 w-4 mr-2 text-blue-600" />
                        Classification Report
                      </h4>
                    </div>
                    <div className="p-2 bg-white">
                      <img
                        src={reportImg}
                        alt="Validation metrics chart"
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className=" bg-gray-50 border-t px-6 py-4">
                  <div className="w-full flex justify-between items-center text-sm text-gray-500">
                    <span>Last updated: May 15, 2025</span>
                    <span className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                      Validated by Universidad del Norte
                    </span>
                  </div>
                </div>
              </div>

              {/* Confusion Matrix Card */}
              <div className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl">
                <div className="h-2 bg-gradient-to-r from-amber-500 to-red-500"></div>
                <div className="pb-2 border-b p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-amber-50">
                        <PieChart className="h-5 w-5 text-amber-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Confusion Matrix</h3>
                    </div>
                    <span className="inline-flex items-center rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                      Classification
                    </span>
                  </div>
                  <p className="text-gray-500 mt-2">Visual representation of our model's prediction accuracy</p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6 mb-6">
                    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h4 className="font-medium text-gray-700">Confusion Matrix Visualization</h4>
                      </div>
                      <div className="p-4 bg-white">
                        <img
                          src={matrixImg}
                          alt="Confusion matrix"
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    </div>

                   
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 flex flex-col">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-500">True Positives</span>
                        <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                          52.7%
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-green-700">783</div>
                      <div className="mt-2">
                        <div className="w-full bg-green-100 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: " 52.7%" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-xl border border-red-100 flex flex-col">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-500">False Positives</span>
                        <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                          23.4%
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-red-700">348</div>
                      <div className="mt-2">
                        <div className="w-full bg-red-100 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: "23.4%" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100 flex flex-col">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-500">False Negatives</span>
                        <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                          2.0%
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-amber-700">29</div>
                      <div className="mt-2">
                        <div className="w-full bg-amber-100 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: "2.0%" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-4 rounded-xl border border-blue-100 flex flex-col">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-500">True Negatives</span>
                        <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                          21.9%
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-blue-700">325</div>
                      <div className="mt-2">
                        <div className="w-full bg-blue-100 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "21.9%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border-t px-6 py-4">
                  <div className="w-full flex justify-between items-center text-sm text-gray-500">
                    <span>Total samples: 1,485</span>
                    <span className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                      75% overall accuracy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Analysis Tab Content */}
        {activeTab === "detailed" && (
          <div className="mt-6">
            <div className="border-0 shadow-lg bg-white rounded-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-2xl font-bold">Detailed Analysis</h3>
                <p className="text-gray-500">Comprehensive information about our breast cancer detection model</p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="border rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection("architecture")}
                      className="w-full flex items-center justify-between p-4 text-left bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-purple-200">
                          <Brain className="h-5 w-5 text-purple-700" />
                        </div>
                        <span className="font-medium text-purple-900">Model Architecture</span>
                        <span className="inline-flex items-center rounded-md border border-purple-300 bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 ml-2">
                          Yolov8l
                        </span>
                      </div>
                      {expandedSection === "architecture" ? (
                        <ChevronUp className="h-5 w-5 text-purple-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-purple-500" />
                      )}
                    </button>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: expandedSection === "architecture" ? "auto" : 0,
                        opacity: expandedSection === "architecture" ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 border-t border-purple-200 bg-white">
                        <p className="text-gray-700">
                          Our breast cancer detection model is based on the YOLOv8-L architecture, specifically designed for object detection tasks in medical imaging. The model was trained for <strong> 128 </strong> epochs using the VinDr-Mammo dataset,
                          which includes <strong> 5,000</strong> annotated mammogram images from real breast cancer cases.
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="border rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection("data")}
                      className="w-full flex items-center justify-between p-4 text-left bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-200">
                          <Database className="h-5 w-5 text-blue-700" />
                        </div>
                        <span className="font-medium text-blue-900">Data Sources</span>
                        <span className="inline-flex items-center rounded-md border border-blue-300 bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 ml-2">
                          5,000 Images
                        </span>
                      </div>
                      {expandedSection === "data" ? (
                        <ChevronUp className="h-5 w-5 text-blue-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-blue-500" />
                      )}
                    </button>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: expandedSection === "data" ? "auto" : 0,
                        opacity: expandedSection === "data" ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 border-t border-blue-200 bg-white">
                        <p className="text-gray-700">
                          <p>
                            The <strong>VinDr-Mammo</strong> dataset was used, containing 5,000 mammograms with double readings and arbitration
                            by a third radiologist to ensure diagnostic accuracy.
                            From this dataset, <strong>1,659 cases</strong> were selected: <strong>1,363</strong> with masses or calcifications rated BI-RADS &gt; 3,
                            and <strong>296</strong> with no detectable abnormalities.
                          </p>


                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="border rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection("validation")}
                      className="w-full flex items-center justify-between p-4 text-left bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-green-200">
                          <CheckCircle2 className="h-5 w-5 text-green-700" />
                        </div>
                        <span className="font-medium text-green-900">Validation Process</span>
                        <span className="inline-flex items-center rounded-md border border-green-300 bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ml-2">
                          Split
                        </span>
                      </div>
                      {expandedSection === "validation" ? (
                        <ChevronUp className="h-5 w-5 text-green-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-green-500" />
                      )}
                    </button>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: expandedSection === "validation" ? "auto" : 0,
                        opacity: expandedSection === "validation" ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 border-t border-green-200 bg-white">
                        <p className="text-gray-700">
                          <p>
                            The dataset was split into <strong>70%</strong> for training, <strong>15%</strong>
                            for validation during training, and <strong>15%</strong> for final testing. 
                            The validation set was used to tune model performance and prevent overfitting, 
                            while the test set was reserved for evaluating the model's generalization after training.
                          </p>

                          .
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="border rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection("limitations")}
                      className="w-full flex items-center justify-between p-4 text-left bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-amber-200">
                          <AlertTriangle className="h-5 w-5 text-amber-700" />
                        </div>
                        <span className="font-medium text-amber-900">Limitations</span>
                        <span className="inline-flex items-center rounded-md border border-amber-300 bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700 ml-2">
                          Support Tool
                        </span>
                      </div>
                      {expandedSection === "limitations" ? (
                        <ChevronUp className="h-5 w-5 text-amber-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-amber-500" />
                      )}
                    </button>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: expandedSection === "limitations" ? "auto" : 0,
                        opacity: expandedSection === "limitations" ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 border-t border-amber-200 bg-white">
                        <p className="text-gray-700">
                          The current model is designed as a support tool for radiologists and should not be used as the
                          sole diagnostic method. It performs best on standard mammogram images and may have reduced
                          accuracy on uncommon presentations.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Model Validation Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Training</div>
              <div className="font-medium">Complete</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Validation</div>
              <div className="font-medium">Complete</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Clinical Testing</div>
              <div className="font-medium">In Progress</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Regulatory</div>
              <div className="font-medium">Pending</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
