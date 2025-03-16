import torch
from model import DisasterResourcePredictor
from data_preprocessing import load_and_preprocess_data

def evaluate_model():
    _, X_test, _, y_test = load_and_preprocess_data('preprocessed_disaster_resource_allocation.csv')
    X_test = torch.tensor(X_test.values, dtype=torch.float32)
    y_test = torch.tensor(y_test.values, dtype=torch.float32)
    
    model = DisasterResourcePredictor(X_test.shape[1])
    model.load_state_dict(torch.load("model.pth"))
    model.eval()
    
    with torch.no_grad():
        predictions = model(X_test)
        criterion = nn.MSELoss()
        test_loss = criterion(predictions, y_test)
        print(f"Test Loss: {test_loss.item():.4f}")
