# Smart Finance Backend

Backend service for Smart Finance application consisting of two main services:

* **Express API** → Authentication, user management, API endpoints, and database operations
* **Flask API** → Machine Learning processing and prediction service
* **Supabase PostgreSQL** → Database
* **Railway** → Deployment platform

---

## Architecture

```text
Frontend
    ↓
Express API
    ↓
Supabase PostgreSQL

Express API
    ↓
Flask ML API
    ↓
PDF Processing
    ↓
CSV Conversion
    ↓
Preprocessing
    ↓
ML Prediction
```

---

## Project Structure

```text
DBS-Backend/
│
├── Express/
│   ├── src/
│   ├── package.json
│   ├── .env
│   └── ...
│
├── Flask/
│   ├── app.py
│   ├── requirements.txt
│   ├── predictor.py
│   ├── model_loader.py
│   ├── models/
│   │   ├── smart_finance.keras
│   │   ├── scaler.pkl
│   │   └── metadata.json
│   │
│   ├── utils/
│   │   ├── pdf_parser.py
│   │   └── preprocessing.py
│   │
│   └── .env
│
└── README.md
```

---

## Features

### Express Service

* User authentication
* Access token & refresh token handling
* User management
* Database operations
* API routing
* Integration with ML service

### Flask Service

* Upload bank statement PDF
* PDF extraction
* Convert PDF into CSV/DataFrame
* Data preprocessing
* Feature scaling
* Machine learning prediction

---

## Machine Learning Flow

```text
User Upload PDF
        ↓
Receive PDF
        ↓
Extract Transaction Data
        ↓
Convert To CSV/DataFrame
        ↓
Preprocessing
        ↓
Scaling
        ↓
Prediction Model
        ↓
Return Result
```

---

## Machine Learning Assets

| File                | Purpose                             |
| ------------------- | ----------------------------------- |
| smart_finance.keras | Trained prediction model            |
| scaler.pkl          | Data scaling before prediction      |
| metadata.json       | Feature ordering and model metadata |

---

## Environment Variables

### Express

Create `.env`

```env
PORT=8080

PGHOST=YOUR_SUPABASE_HOST
PGUSER=postgres
PGPASSWORD=YOUR_PASSWORD
PGDATABASE=postgres
PGPORT=5432

DATABASE_URL=YOUR_DATABASE_URL

ACCESS_TOKEN_KEY=YOUR_ACCESS_KEY
REFRESH_TOKEN_KEY=YOUR_REFRESH_KEY

ML_API_URL=YOUR_FLASK_API_URL
```

---

### Flask

Create `.env`

```env
PORT=8080

MODEL_PATH=models/smart_finance.keras
SCALER_PATH=models/scaler.pkl
```

---

## Installation

Clone repository:

```bash
git clone <repository-url>

cd DBS-Backend
```

---

### Install Express Dependencies

```bash
cd Express

npm install
```

Run Express:

```bash
npm run dev
```

---

### Install Flask Dependencies

```bash
cd Flask

pip install -r requirements.txt
```

Run Flask:

```bash
python app.py
```

---

## Deployment

### Express Deployment

Platform:

* Railway

Build command:

```bash
npm install
```

Start command:

```bash
npm start
```

---

### Flask Deployment

Platform:

* Railway

Build command:

```bash
pip install -r requirements.txt
```

Start command:

```bash
gunicorn app:app
```

---

## Technologies

Backend:

* Node.js
* Express.js
* Flask
* PostgreSQL
* Supabase

Machine Learning:

* TensorFlow
* Scikit-learn
* Pandas
* NumPy

Deployment:

* Railway

---

## Team

Smart Finance Capstone Project
