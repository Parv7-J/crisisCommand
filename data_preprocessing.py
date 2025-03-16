import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder

def load_and_preprocess_data(filepath):
    df = pd.read_csv(filepath)
    
    X = df[['DisasterType', 'Location', 'ResourceType', 'QuantityOfSkilledResources', 
            'QuantityOfEquipment', 'BudgetAllocation', 'AllocationStatus', 'TransportationMode']].copy()
    y = df[['SupplyQuantity', 'DemandQuantity', 'AllocatedQuantity']].copy()
    
    le = LabelEncoder()
    for col in ['DisasterType', 'Location', 'ResourceType', 'AllocationStatus', 'TransportationMode']:
        X[col] = le.fit_transform(X[col])
    
    scaler = StandardScaler()
    num_cols = ['QuantityOfSkilledResources', 'QuantityOfEquipment', 'BudgetAllocation']
    X[num_cols] = scaler.fit_transform(X[num_cols])
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    return X_train, X_test, y_train, y_test
