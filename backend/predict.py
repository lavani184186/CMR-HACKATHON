import os
import joblib
import numpy as np

# --------------------------------------------------
# MODEL DIRECTORY
# --------------------------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")


# --------------------------------------------------
# LOAD ALL 12 MODELS
# --------------------------------------------------

MODELS = {}

for target in ["speed", "flow", "congestion"]:
    for horizon in [15, 30, 45, 60]:

        filename = f"lightgbm_{target}_{horizon}m.joblib"
        model_path = os.path.join(MODEL_DIR, filename)

        if not os.path.exists(model_path):
            raise FileNotFoundError(
                f"Model not found: {model_path}"
            )

        MODELS[f"{target}_{horizon}m"] = joblib.load(model_path)


print(f"Loaded {len(MODELS)} LightGBM models.")


# --------------------------------------------------
# EXPECTED FEATURES
# --------------------------------------------------

FEATURE_NAMES = MODELS["congestion_15m"].feature_name_

print(f"Model expects {len(FEATURE_NAMES)} features.")


# --------------------------------------------------
# PREDICTION FUNCTION
# --------------------------------------------------

def predict_traffic(features):

    """
    features:
        pandas DataFrame containing exactly the
        features required by the trained models.

    Returns:
        Dictionary containing predictions for
        speed, flow and congestion at
        15, 30, 45 and 60 minutes.
    """

    # Make sure columns are in exactly the
    # same order used during training.
    features = features[FEATURE_NAMES]

    result = {
        "speed": {},
        "flow": {},
        "congestion": {}
    }

    # --------------------------------------------------
    # SPEED
    # --------------------------------------------------

    for horizon in [15, 30, 45, 60]:

        model = MODELS[f"speed_{horizon}m"]

        prediction = model.predict(features)

        result["speed"][f"{horizon}m"] = float(
            np.asarray(prediction).reshape(-1)[0]
        )

    # --------------------------------------------------
    # FLOW
    # --------------------------------------------------

    for horizon in [15, 30, 45, 60]:

        model = MODELS[f"flow_{horizon}m"]

        prediction = model.predict(features)

        result["flow"][f"{horizon}m"] = float(
            np.asarray(prediction).reshape(-1)[0]
        )

    # --------------------------------------------------
    # CONGESTION
    # --------------------------------------------------

    for horizon in [15, 30, 45, 60]:

        model = MODELS[f"congestion_{horizon}m"]

        prediction = model.predict(features)

        result["congestion"][f"{horizon}m"] = float(
            np.asarray(prediction).reshape(-1)[0]
        )

    return result