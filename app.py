import os
import json
import pandas as pd
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from flask import Flask, request, jsonify
import pickle
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("disaster_api.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Global variables for model and preprocessing components
model = None
encoders = {}
scaler = None
categorical_columns = ['DisasterType', 'Location', 'ResourceType', 'AllocationStatus', 'TransportationMode']
numerical_columns = ['QuantityOfSkilledResources', 'BudgetAllocation']  # Removed QuantityOfEquipment

# Define paths for model artifacts
MODEL_DIR = 'model_artifacts'
MODEL_PATH = os.path.join(MODEL_DIR, 'disaster_model.pth')
ENCODERS_PATH = os.path.join(MODEL_DIR, 'encoders.pkl')
SCALER_PATH = os.path.join(MODEL_DIR, 'scaler.pkl')

# Create directory if it doesn't exist
os.makedirs(MODEL_DIR, exist_ok=True)

# Define the neural network model
class DisasterResourcePredictor(nn.Module):
    def __init__(self):
        super(DisasterResourcePredictor, self).__init__()
        self.fc1 = nn.Linear(7, 256)  # Changed from 8 to 7 inputs
        self.fc2 = nn.Linear(256, 256)
        self.fc3 = nn.Linear(256, 128)
        self.fc4 = nn.Linear(128, 3)
        
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = torch.relu(self.fc3(x))
        x = self.fc4(x)
        return x

def load_model():
    """Load the model and preprocessing components from disk."""
    global model, encoders, scaler
    
    try:
        # Load model
        model = DisasterResourcePredictor()
        model.load_state_dict(torch.load(MODEL_PATH))
        model.eval()
        
        # Load encoders and scaler
        with open(ENCODERS_PATH, 'rb') as f:
            encoders = pickle.load(f)
            
        with open(SCALER_PATH, 'rb') as f:
            scaler = pickle.load(f)
        
        logger.info("Model and preprocessing components loaded successfully.")
        return True
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        return False

def train_and_save_model(data_path):
    """Train a new model and save it along with preprocessing components."""
    global model, encoders, scaler
    
    try:
        # Load the dataset
        df = pd.read_csv(data_path)
        
        # Select relevant features for prediction - remove QuantityOfEquipment
        X = df[['DisasterType', 'Location', 'ResourceType', 'QuantityOfSkilledResources', 
                'BudgetAllocation', 'AllocationStatus', 'TransportationMode']]
        y = df[['SupplyQuantity', 'DemandQuantity', 'AllocatedQuantity']]
        
        # Encode categorical variables
        encoders = {}
        for col in categorical_columns:
            encoders[col] = LabelEncoder()
            X[col] = encoders[col].fit_transform(X[col])
        
        # Scale numerical features
        scaler = StandardScaler()
        X[numerical_columns] = scaler.fit_transform(X[numerical_columns])
        
        # Split data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Convert data to tensors
        X_train = torch.tensor(X_train.values, dtype=torch.float32)
        X_test = torch.tensor(X_test.values, dtype=torch.float32)
        y_train = torch.tensor(y_train.values, dtype=torch.float32)
        y_test = torch.tensor(y_test.values, dtype=torch.float32)
        
        # Initialize the model
        model = DisasterResourcePredictor()
        criterion = nn.MSELoss()
        optimizer = optim.Adam(model.parameters(), lr=0.001)
        
        # Training loop with early stopping
        best_loss = float('inf')
        patience = 20
        counter = 0
        
        for epoch in range(1000):
            model.train()
            optimizer.zero_grad()
            outputs = model(X_train)
            loss = criterion(outputs, y_train)
            loss.backward()
            optimizer.step()
            
            # Validation check
            model.eval()
            with torch.no_grad():
                val_outputs = model(X_test)
                val_loss = criterion(val_outputs, y_test)
            
            if val_loss < best_loss:
                best_loss = val_loss
                counter = 0
                # Save the best model state
                best_model_state = model.state_dict()
            else:
                counter += 1
            
            if counter >= patience:
                logger.info(f"Early stopping at epoch {epoch+1}")
                break
            
            if epoch % 50 == 0:
                logger.info(f"Epoch {epoch+1}, Training Loss: {loss.item()}, Validation Loss: {val_loss.item()}")
        
        # Load the best model state
        model.load_state_dict(best_model_state)
        
        # Save model and preprocessing components
        torch.save(model.state_dict(), MODEL_PATH)
        
        with open(ENCODERS_PATH, 'wb') as f:
            pickle.dump(encoders, f)
            
        with open(SCALER_PATH, 'wb') as f:
            pickle.dump(scaler, f)
        
        # Final evaluation
        model.eval()
        with torch.no_grad():
            predictions = model(X_test)
            test_loss = criterion(predictions, y_test)
        
        logger.info(f"Model training complete. Final test loss: {test_loss.item()}")
        return {"status": "success", "test_loss": test_loss.item()}
    
    except Exception as e:
        logger.error(f"Error training model: {str(e)}")
        return {"status": "error", "message": str(e)}

def preprocess_input(input_data):
    """Process input data using the same transformations as training data."""
    processed_data = []
    
    # Process categorical variables
    for col in categorical_columns:
        if col in input_data:
            try:
                processed_data.append(encoders[col].transform([input_data[col]])[0])
            except ValueError:
                logger.warning(f"Unknown category {input_data[col]} for {col}, using default")
                processed_data.append(encoders[col].transform([encoders[col].classes_[0]])[0])
        else:
            logger.error(f"Missing required column: {col}")
            return None
    
    # Process numerical variables
    for col in numerical_columns:
        if col in input_data:
            processed_data.append(scaler.transform([[float(input_data[col])]])[0][0])
        else:
            logger.error(f"Missing required column: {col}")
            return None
    
    return torch.tensor([processed_data], dtype=torch.float32)

@app.route('/api/predict', methods=['POST'])
def predict():
    """API endpoint for making predictions."""
    if model is None:
        if not load_model():
            return jsonify({"error": "Model not loaded. Train a model first."}), 500
    
    try:
        input_data = request.json
        logger.info(f"Received prediction request: {json.dumps(input_data)}")
        
        # Check if all required fields are present
        required_fields = categorical_columns + numerical_columns
        missing_fields = [field for field in required_fields if field not in input_data]
        
        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400
        
        # Preprocess the input
        processed_input = preprocess_input(input_data)
        if processed_input is None:
            return jsonify({"error": "Error processing input data"}), 400
        
        # Make prediction
        model.eval()
        with torch.no_grad():
            prediction = model(processed_input)
        
        # Format the output
        result = {
            "SupplyQuantity": float(prediction[0][0]),
            "DemandQuantity": float(prediction[0][1]),
            "AllocatedQuantity": float(prediction[0][2]),
            "timestamp": datetime.now().isoformat()
        }
        
        logger.info(f"Prediction result: {json.dumps(result)}")
        return jsonify(result), 200
    
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/train', methods=['POST'])
def train():
    """API endpoint for training a new model."""
    try:
        # Check if file was uploaded
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Save the uploaded file temporarily
        temp_file_path = os.path.join(MODEL_DIR, 'temp_training_data.csv')
        file.save(temp_file_path)
        
        # Train the model
        result = train_and_save_model(temp_file_path)
        
        # Clean up the temporary file
        os.remove(temp_file_path)
        
        if result["status"] == "success":
            return jsonify({
                "message": "Model trained successfully",
                "test_loss": result["test_loss"]
            }), 200
        else:
            return jsonify({"error": result["message"]}), 500
    
    except Exception as e:
        logger.error(f"Training error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/model-info', methods=['GET'])
def model_info():
    """API endpoint to get information about the current model."""
    if model is None:
        if not load_model():
            return jsonify({"status": "No model available"}), 200
    
    try:
        # Get information about the model
        model_exists = os.path.exists(MODEL_PATH)
        encoders_exist = os.path.exists(ENCODERS_PATH)
