import torch
import torch.optim as optim
from data_preprocessing import load_and_preprocess_data
from model import DisasterResourcePredictor

def train_model():
    X_train, X_test, y_train, y_test = load_and_preprocess_data('preprocessed_disaster_resource_allocation.csv')
    X_train = torch.tensor(X_train.values, dtype=torch.float32)
    y_train = torch.tensor(y_train.values, dtype=torch.float32)
    model = DisasterResourcePredictor(X_train.shape[1])
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    epochs = 300
    for epoch in range(epochs):
        model.train()
        optimizer.zero_grad()
        outputs = model(X_train)
        loss = criterion(outputs, y_train)
        loss.backward()
        optimizer.step()
        if (epoch + 1) % 50 == 0:
            print(f"Epoch {epoch+1}, Loss: {loss.item():.4f}")
    
    torch.save(model.state_dict(), "model.pth")
    print("Model saved successfully!")
