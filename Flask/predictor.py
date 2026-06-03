import pandas as pd
from model_loader import model, scaler

def predict(data):

    df = pd.DataFrame([data])

    scaled_data = scaler.transform(df)

    prediction = model.predict(
        scaled_data
    )

    return prediction.tolist()