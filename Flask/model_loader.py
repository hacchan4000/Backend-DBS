import tensorflow as tf
import joblib
import json
import os

model = tf.keras.models.load_model(
    os.environ.get("MODEL_PATH")
)

scaler = joblib.load(
    os.environ.get("SCALER_PATH")
)

with open(
    os.environ.get("METADATA_PATH")
) as f:
    metadata = json.load(f)