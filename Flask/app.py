from flask import Flask
from flask import request
from predictor import predict
from utils.pdf_parser import pdf_to_dataframe
import os

app=Flask(__name__)

UPLOAD_FOLDER='uploads'

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

@app.route("/predict",methods=["POST"])
def prediction():

    file=request.files['file']

    filepath=os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(filepath)

    df=pdf_to_dataframe(
        filepath
    )

    result=predict(df)

    return {
        "prediction":result
    }

if __name__=="__main__":
    app.run(
        host="0.0.0.0",
        port=int(
            os.environ.get(
                "PORT",
                5000
            )
        )
    )