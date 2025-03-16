import torch
from model import DisasterResourcePredictor

def predict(input_data):
    model = DisasterResourcePredictor(len(input_data[0]))
    model.load_state_dict(torch.load("model.pth"))
    model.eval()
    
    input_tensor = torch.tensor(input_data, dtype=torch.float32)
    with torch.no_grad():
        predicted_resources = model(input_tensor)
    
    output = {
        "food": max(50, int(predicted_resources[0][0])),
        "water": int(predicted_resources[0][1]),
        "medical_kits": int(predicted_resources[0][2]),
        "shelters": int(predicted_resources[0][2] / 10)
    }
    return output
