import React, { useState } from "react";
import { Chart } from "chart.js/auto";

const DisasterResourceAllocationPredictor = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    disasterType: "",
    location: "",
    resourceType: "",
    skilledResources: 0,
    equipment: 0,
    budget: 0,
    allocationStatus: "",
    transportationMode: "",
  });

  // State for results
  const [results, setResults] = useState({
    supplyQuantity: "-",
    demandQuantity: "-",
    allocatedQuantity: "-",
  });

  // State for loading and alerts
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Chart instance
  const [resultChart, setResultChart] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hide alerts and show loading
    setError("");
    setSuccess("");
    setLoading(true);

    // Simulate API call (replace with actual API call)
    setTimeout(() => {
      // Mock response
      const mockResponse = {
        supplyQuantity: Math.floor(Math.random() * 1000),
        demandQuantity: Math.floor(Math.random() * 1000),
        allocatedQuantity: Math.floor(Math.random() * 1000),
      };

      // Update results
      setResults(mockResponse);

      // Update chart
      updateChart(
        mockResponse.supplyQuantity,
        mockResponse.demandQuantity,
        mockResponse.allocatedQuantity
      );

      // Show success message
      setSuccess("Prediction successful!");
      setLoading(false);
    }, 2000);
  };

  // Update or create the chart
  const updateChart = (supply, demand, allocated) => {
    const ctx = document.getElementById("resultChart").getContext("2d");

    // Destroy existing chart if it exists
    if (resultChart) {
      resultChart.destroy();
    }

    // Create new chart
    const newChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Supply", "Demand", "Allocated"],
        datasets: [
          {
            label: "Resource Quantities",
            data: [supply, demand, allocated],
            backgroundColor: [
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 99, 132, 0.7)",
              "rgba(75, 192, 192, 0.7)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Quantity",
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Resource Allocation Analysis",
            font: {
              size: 16,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.raw.toFixed(2)}`;
              },
            },
          },
        },
      },
    });

    // Save chart instance
    setResultChart(newChart);
  };

  return (
    <div className="text-gray-950">
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.container}>
          <h1>Disaster Resource Allocation Predictor</h1>
          <p style={styles.subtitle}>
            Predict resource needs based on disaster scenarios
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.container}>
        <div style={styles.dashboard}>
          {/* Form Card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Disaster Scenario Parameters</h2>
            {error && <div style={styles.alertDanger}>{error}</div>}
            {success && <div style={styles.alertSuccess}>{success}</div>}

            <form onSubmit={handleSubmit}>
              {/* Disaster Type */}
              <div style={styles.formGroup}>
                <label htmlFor="disasterType">Disaster Type</label>
                <select
                  id="disasterType"
                  name="disasterType"
                  value={formData.disasterType}
                  onChange={handleInputChange}
                  required
                  className="text-gray-900 bg-white border border-gray-300 rounded-md"
                >
                  <option value="">Select disaster type</option>
                  <option value="Flood">Flood</option>
                  <option value="Earthquake">Earthquake</option>
                  <option value="Hurricane">Hurricane</option>
                  <option value="Wildfire">Wildfire</option>
                  <option value="Drought">Drought</option>
                  <option value="Tornado">Tornado</option>
                  <option value="Tsunami">Tsunami</option>
                </select>
              </div>

              {/* Location */}
              <div style={styles.formGroup}>
                <label htmlFor="location">Location</label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="text-gray-900 bg-white border border-gray-300 rounded-md"
                >
                  <option value="">Select location type</option>
                  <option value="Urban">Urban</option>
                  <option value="Rural">Rural</option>
                  <option value="Suburban">Suburban</option>
                  <option value="Coastal">Coastal</option>
                  <option value="Mountain">Mountain</option>
                </select>
              </div>

              {/* Resource Type */}
              <div style={styles.formGroup}>
                <label htmlFor="resourceType">Resource Type</label>
                <select
                  id="resourceType"
                  name="resourceType"
                  value={formData.resourceType}
                  onChange={handleInputChange}
                  required
                  className="text-gray-900 bg-white border border-gray-300 rounded-md"
                >
                  <option value="">Select resource type</option>
                  <option value="Food">Food</option>
                  <option value="Water">Water</option>
                  <option value="Medical">Medical</option>
                  <option value="Shelter">Shelter</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Fuel">Fuel</option>
                </select>
              </div>

              {/* Skilled Resources */}
              <div style={styles.formGroup}>
                <label htmlFor="skilledResources">
                  Quantity of Skilled Resources
                </label>
                <input
                  type="number"
                  id="skilledResources"
                  name="skilledResources"
                  value={formData.skilledResources}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="text-gray-900 bg-white border border-gray-300 rounded-md"
                />
              </div>

              {/* Equipment */}
              <div style={styles.formGroup}>
                <label htmlFor="equipment">Quantity of Equipment</label>
                <input
                  type="number"
                  id="equipment"
                  name="equipment"
                  value={formData.equipment}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="text-gray-900 bg-white border border-gray-300 rounded-md"
                />
              </div>

              {/* Budget */}
              <div style={styles.formGroup}>
                <label htmlFor="budget">Budget Allocation ($)</label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="text-gray-900 bg-white border border-gray-300 rounded-md"
                />
              </div>

              {/* Allocation Status */}
              <div style={styles.formGroup}>
                <label htmlFor="allocationStatus">Allocation Status</label>
                <select
                  id="allocationStatus"
                  name="allocationStatus"
                  value={formData.allocationStatus}
                  onChange={handleInputChange}
                  required
                  className="text-gray-900 bg-white border border-gray-300 rounded-md"
                >
                  <option value="">Select allocation status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Delayed">Delayed</option>
                </select>
              </div>

              {/* Transportation Mode */}
              <div style={styles.formGroup}>
                <label htmlFor="transportationMode">Transportation Mode</label>
                <select
                  id="transportationMode"
                  name="transportationMode"
                  value={formData.transportationMode}
                  onChange={handleInputChange}
                  required
                  className="text-gray-900 bg-white border border-gray-300 rounded-md"
                >
                  <option value="">Select transportation mode</option>
                  <option value="Road">Road</option>
                  <option value="Air">Air</option>
                  <option value="Sea">Sea</option>
                  <option value="Rail">Rail</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>

              {/* Submit Button */}
              <button type="submit" style={styles.button}>
                Predict Resource Allocation
              </button>
            </form>

            {/* Loading Spinner */}
            {loading && (
              <div style={styles.loading}>
                <div style={styles.spinner}></div>
                <p>Processing your request...</p>
              </div>
            )}
          </div>

          {/* Results Card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Prediction Results</h2>
            {results.supplyQuantity !== "-" ? (
              <div style={styles.results}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Supply Quantity</td>
                      <td>{results.supplyQuantity}</td>
                    </tr>
                    <tr>
                      <td>Demand Quantity</td>
                      <td>{results.demandQuantity}</td>
                    </tr>
                    <tr>
                      <td>Allocated Quantity</td>
                      <td>{results.allocatedQuantity}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Chart Container */}
                <div style={styles.chartContainer}>
                  <canvas id="resultChart"></canvas>
                </div>
              </div>
            ) : (
              <p>
                Enter disaster scenario parameters and submit to see
                predictions.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles (inline styles for simplicity)
const styles = {
  header: {
    backgroundColor: "#2c6fad",
    color: "#fff",
    padding: "20px 0",
    textAlign: "center",
    marginBottom: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  dashboard: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "25px",
  },
  cardTitle: {
    fontSize: "1.4rem",
    color: "#0d4a8a",
    marginTop: "0",
    marginBottom: "20px",
    paddingBottom: "15px",
    borderBottom: "1px solid #eee",
  },
  formGroup: {
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#2c6fad",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    width: "100%",
    transition: "background-color 0.3s",
  },
  loading: {
    textAlign: "center",
    margin: "20px 0",
  },
  spinner: {
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #2c6fad",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
    margin: "0 auto",
  },
  results: {
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
  },
  chartContainer: {
    height: "400px",
    marginTop: "30px",
  },
  alertDanger: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  alertSuccess: {
    backgroundColor: "#d4edda",
    color: "#155724",
    border: "1px solid #c3e6cb",
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "20px",
  },
};

export default DisasterResourceAllocationPredictor;
