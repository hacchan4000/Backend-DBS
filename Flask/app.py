from flask import Flask, request, jsonify
from flask_cors import CORS
from predictor import predict
from utils.pdf_parser import pdf_to_dataframe
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.environ.get(
    "UPLOAD_FOLDER",
    "uploads"
)

TEMP_FOLDER = os.environ.get(
    "TEMP_FOLDER",
    "temp"
)

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

os.makedirs(
    TEMP_FOLDER,
    exist_ok=True
)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/")
def hello_world():
    return jsonify({
        "message": "Flask API running successfully"
    })


@app.route("/predict", methods=["POST"])
def prediction():

    try:

        # cek file ada atau tidak
        if 'file' not in request.files:
            return jsonify({
                "error": "No file uploaded"
            }), 400

        file = request.files['file']

        # cek nama file kosong
        if file.filename == '':
            return jsonify({
                "error": "Empty filename"
            }), 400

        # amankan nama file
        filename = secure_filename(
            file.filename
        )

        filepath = os.path.join(
            app.config["UPLOAD_FOLDER"],
            filename
        )

        # simpan file
        file.save(filepath)

        # convert pdf -> dataframe
        df = pdf_to_dataframe(
            filepath
        )

        # jalankan model
        result = predict(df)

        # hapus file sementara
        if os.path.exists(filepath):
            os.remove(filepath)

        return jsonify({
            "prediction": result
        })


    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=int(
            os.environ.get(
                "PORT",
                5000
            )
        )
    )