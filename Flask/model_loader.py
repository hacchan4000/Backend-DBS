import tensorflow as tf
import joblib
import json

model = tf.keras.models.load_model(
    'models/smart_finance.keras'
)

scaler = joblib.load(
    'models/scaler.pkl'
)

with open(
    'models/metadata.json'
) as f:
    metadata = json.load(f)