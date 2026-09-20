# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS

from preprocessing import prepare_model_features
from predict import predict_traffic


# ============================================================
# FLASK APP
# ============================================================

app = Flask(__name__)

# Allow React frontend to communicate with Flask
CORS(app)


# ============================================================
# HOME / HEALTH CHECK
# ============================================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "status": "online",
        "service": "TrafficSethu AI Backend",
        "message": "Flask API is running"
    })


# ============================================================
# MODEL STATUS
# ============================================================

@app.route("/api/status", methods=["GET"])
def status():

    return jsonify({
        "backend": "online",
        "models": 12,
        "forecast_horizons": [
            "15m",
            "30m",
            "45m",
            "60m"
        ],
        "targets": [
            "speed",
            "flow",
            "congestion"
        ]
    })


# ============================================================
# FORECAST API
# ============================================================

@app.route("/api/forecast", methods=["POST"])
def forecast():

    try:

        # ----------------------------------------------------
        # Receive JSON from React
        # ----------------------------------------------------

        data = request.get_json()

        if not data:

            return jsonify({
                "success": False,
                "error": "No input data received"
            }), 400


        # ----------------------------------------------------
        # Convert input into DataFrame
        # ----------------------------------------------------

        import pandas as pd

        df = pd.DataFrame([data])


        # ----------------------------------------------------
        # Prepare model features
        # ----------------------------------------------------

        features = prepare_model_features(df)


        # ----------------------------------------------------
        # Generate predictions
        # ----------------------------------------------------

        predictions = predict_traffic(features)


        # ----------------------------------------------------
        # Send response to React
        # ----------------------------------------------------

        return jsonify({
            "success": True,
            "forecast": predictions
        })


    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# ============================================================
# RUN SERVER
# ============================================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )