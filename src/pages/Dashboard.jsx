import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
  } from "recharts"
  
  const Dashboard = () => {
    // Sample data for the charts
    const modelPerformanceData = [
      { name: "Accuracy", value: 0.92 },
      { name: "Precision", value: 0.89 },
      { name: "Recall", value: 0.94 },
      { name: "F1 Score", value: 0.91 },
    ]
  
    const confusionMatrixData = [
      { name: "True Positive", value: 187 },
      { name: "False Positive", value: 23 },
      { name: "False Negative", value: 12 },
      { name: "True Negative", value: 178 },
    ]
  
    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]
  
    const monthlyDetectionData = [
      { month: "Jan", detections: 65 },
      { month: "Feb", detections: 59 },
      { month: "Mar", detections: 80 },
      { month: "Apr", detections: 81 },
      { month: "May", detections: 56 },
      { month: "Jun", detections: 55 },
      { month: "Jul", detections: 40 },
    ]
  
    const featureImportanceData = [
      { feature: "Feature A", importance: 0.23 },
      { feature: "Feature B", importance: 0.18 },
      { feature: "Feature C", importance: 0.15 },
      { feature: "Feature D", importance: 0.12 },
      { feature: "Feature E", importance: 0.1 },
      { feature: "Other Features", importance: 0.22 },
    ]
  
    return (
      <div className="p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary"> Dashboard</h1>
          <p className="text-gray-600">Technical metrics and project performance analytics</p>
        </header>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Model Performance Metrics */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Model Performance Metrics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={modelPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 1]} />
                <Tooltip formatter={(value) => value.toFixed(2)} />
                <Legend />
                <Bar dataKey="value" name="Score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
  
          {/* Confusion Matrix */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Confusion Matrix</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={confusionMatrixData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {confusionMatrixData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
  
          {/* Monthly Detections */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Monthly Detections</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyDetectionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="detections" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
  
          {/* Feature Importance */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Feature Importance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={featureImportanceData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 0.25]} />
                <YAxis dataKey="feature" type="category" />
                <Tooltip formatter={(value) => value.toFixed(2)} />
                <Legend />
                <Bar dataKey="importance" name="Importance" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
  
        {/* Project Information */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Project Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Model Architecture</h3>
              <p className="text-gray-700">
                Our breast cancer detection model uses a convolutional neural network (CNN) architecture optimized for
                medical image analysis. The model was trained on a dataset of 10,000 mammogram images with verified
                diagnoses.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Data Sources</h3>
              <p className="text-gray-700">
                The training data was sourced from multiple medical institutions with proper anonymization and consent.
                The dataset includes diverse demographics to ensure the model performs well across different populations.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Validation Process</h3>
              <p className="text-gray-700">
                The model underwent rigorous validation using 5-fold cross-validation and was tested on an independent
                test set of 400 images not seen during training. Results were reviewed by a panel of radiologists.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Limitations</h3>
              <p className="text-gray-700">
                The current model is designed as a support tool for radiologists and should not be used as the sole
                diagnostic method. It performs best on standard mammogram images and may have reduced accuracy on uncommon
                presentations.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Dashboard
  