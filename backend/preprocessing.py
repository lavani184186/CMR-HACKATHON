# backend/preprocessing.py

import numpy as np
import pandas as pd


# ============================================================
# EXACT FEATURES USED BY THE TRAINED LIGHTGBM MODELS
# ============================================================

FEATURE_NAMES = [
    "segment_id",
    "speed_kmh",
    "flow_vph",
    "occupancy_pct",
    "travel_time_min",
    "free_flow_time_min",
    "delay_min",
    "queue_length_veh",
    "congestion_index",
    "sensor_quality",

    "road_class",
    "lanes",
    "free_flow_speed_kmh",
    "capacity_vph",
    "length_km",
    "grade_pct",
    "signal_id",
    "structural_bottleneck",
    "importance",
    "peak_capacity_factor",

    "temperature_c",
    "rain_intensity",
    "event_level",
    "holiday_flag",

    "incident_count",
    "incident_severity_max",
    "lanes_blocked_total",

    "incident_type_accident_like",
    "incident_type_demand_surge",
    "incident_type_lane_blockage",
    "incident_type_road_closure",
    "incident_type_stalled_vehicle",

    "roadwork_active",
    "roadwork_closure_fraction",

    "work_type_lane_maintenance",
    "work_type_resurfacing",
    "work_type_utility_work",

    "hour",
    "minute",
    "day_of_week",
    "is_weekend",
    "time_sin",
    "time_cos",

    "flow_capacity_ratio",
    "speed_freeflow_ratio",

    # Speed lags
    "speed_kmh_lag_1",
    "speed_kmh_lag_2",
    "speed_kmh_lag_3",
    "speed_kmh_lag_6",
    "speed_kmh_lag_12",
    "speed_kmh_lag_36",
    "speed_kmh_lag_72",
    "speed_kmh_lag_288",

    # Flow lags
    "flow_vph_lag_1",
    "flow_vph_lag_2",
    "flow_vph_lag_3",
    "flow_vph_lag_6",
    "flow_vph_lag_12",
    "flow_vph_lag_36",
    "flow_vph_lag_72",
    "flow_vph_lag_288",

    # Occupancy lags
    "occupancy_pct_lag_1",
    "occupancy_pct_lag_2",
    "occupancy_pct_lag_3",
    "occupancy_pct_lag_6",
    "occupancy_pct_lag_12",
    "occupancy_pct_lag_36",
    "occupancy_pct_lag_72",
    "occupancy_pct_lag_288",

    # Congestion lags
    "congestion_index_lag_1",
    "congestion_index_lag_2",
    "congestion_index_lag_3",
    "congestion_index_lag_6",
    "congestion_index_lag_12",
    "congestion_index_lag_36",
    "congestion_index_lag_72",
    "congestion_index_lag_288",

    # Speed rolling
    "speed_kmh_rolling_mean_3",
    "speed_kmh_rolling_std_3",
    "speed_kmh_rolling_mean_6",
    "speed_kmh_rolling_std_6",
    "speed_kmh_rolling_mean_12",
    "speed_kmh_rolling_std_12",
    "speed_kmh_rolling_mean_36",
    "speed_kmh_rolling_std_36",

    # Flow rolling
    "flow_vph_rolling_mean_3",
    "flow_vph_rolling_std_3",
    "flow_vph_rolling_mean_6",
    "flow_vph_rolling_std_6",
    "flow_vph_rolling_mean_12",
    "flow_vph_rolling_std_12",
    "flow_vph_rolling_mean_36",
    "flow_vph_rolling_std_36",

    # Congestion rolling
    "congestion_index_rolling_mean_3",
    "congestion_index_rolling_std_3",
    "congestion_index_rolling_mean_6",
    "congestion_index_rolling_std_6",
    "congestion_index_rolling_mean_12",
    "congestion_index_rolling_std_12",
    "congestion_index_rolling_mean_36",
    "congestion_index_rolling_std_36",

    # Changes
    "speed_change_5m",
    "flow_change_5m",
    "congestion_change_5m"
]


# ============================================================
# CREATE HISTORICAL TRAFFIC FEATURES
# ============================================================

def create_traffic_features(df):
    """
    Create the lag, rolling and change features used during
    LightGBM training.

    Input:
        Historical traffic DataFrame.

    Output:
        DataFrame containing model features.
    """

    df = df.copy()

    # --------------------------------------------------------
    # Timestamp
    # --------------------------------------------------------

    df["timestamp"] = pd.to_datetime(df["timestamp"])

    df = df.sort_values(
        ["segment_id", "timestamp"]
    ).reset_index(drop=True)

    # --------------------------------------------------------
    # Time features
    # --------------------------------------------------------

    df["hour"] = df["timestamp"].dt.hour

    df["minute"] = df["timestamp"].dt.minute

    df["day_of_week"] = df["timestamp"].dt.dayofweek

    df["is_weekend"] = (
        df["day_of_week"] >= 5
    ).astype(int)

    # Same cyclic representation used for time-of-day
    minutes_of_day = (
        df["hour"] * 60 + df["minute"]
    )

    df["time_sin"] = np.sin(
        2 * np.pi * minutes_of_day / 1440
    )

    df["time_cos"] = np.cos(
        2 * np.pi * minutes_of_day / 1440
    )

    # --------------------------------------------------------
    # Network ratios
    # --------------------------------------------------------

    df["flow_capacity_ratio"] = (
        df["flow_vph"] /
        df["capacity_vph"].replace(0, np.nan)
    )

    df["speed_freeflow_ratio"] = (
        df["speed_kmh"] /
        df["free_flow_speed_kmh"].replace(0, np.nan)
    )

    # --------------------------------------------------------
    # Lag features
    # --------------------------------------------------------

    lag_values = [1, 2, 3, 6, 12, 36, 72, 288]

    base_columns = [
        "speed_kmh",
        "flow_vph",
        "occupancy_pct",
        "congestion_index"
    ]

    for col in base_columns:

        for lag in lag_values:

            feature_name = f"{col}_lag_{lag}"

            df[feature_name] = (
                df.groupby("segment_id")[col]
                .shift(lag)
            )

    # --------------------------------------------------------
    # Rolling features
    #
    # IMPORTANT:
    # Use shift(1) so the current observation does
    # not leak into the historical rolling statistics.
    # --------------------------------------------------------

    rolling_windows = [3, 6, 12, 36]

    rolling_columns = [
        "speed_kmh",
        "flow_vph",
        "congestion_index"
    ]

    for col in rolling_columns:

        grouped = df.groupby("segment_id")[col]

        for window in rolling_windows:

            mean_name = (
                f"{col}_rolling_mean_{window}"
            )

            std_name = (
                f"{col}_rolling_std_{window}"
            )

            shifted = grouped.shift(1)

            df[mean_name] = (
                shifted
                .groupby(df["segment_id"])
                .transform(
                    lambda x: x.rolling(
                        window,
                        min_periods=1
                    ).mean()
                )
            )

            df[std_name] = (
                shifted
                .groupby(df["segment_id"])
                .transform(
                    lambda x: x.rolling(
                        window,
                        min_periods=1
                    ).std()
                )
            )

    # --------------------------------------------------------
    # 5-minute changes
    # --------------------------------------------------------

    for col in [
        "speed_kmh",
        "flow_vph",
        "congestion_index"
    ]:

        change_name = f"{col.replace('_', '_')}_change_5m"

        df[change_name] = (
            df.groupby("segment_id")[col]
            .diff(1)
        )

    return df


# ============================================================
# PREPARE MODEL INPUT
# ============================================================

def prepare_model_features(df):
    """
    Select the exact 104 features expected by the models.
    """

    df = df.copy()

    # Make sure all expected columns exist.
    missing = [
        col
        for col in FEATURE_NAMES
        if col not in df.columns
    ]

    if missing:

        raise ValueError(
            "Missing model features:\n"
            + "\n".join(missing)
        )

    # --------------------------------------------------------
    # Select exact order
    # --------------------------------------------------------

    X = df[FEATURE_NAMES].copy()

    # --------------------------------------------------------
    # Numeric columns
    # --------------------------------------------------------

    numeric_columns = X.select_dtypes(
        include=["number"]
    ).columns

    X[numeric_columns] = (
        X[numeric_columns]
        .replace([np.inf, -np.inf], np.nan)
        .fillna(0)
    )

    # --------------------------------------------------------
    # Categorical columns
    # --------------------------------------------------------

    categorical_columns = [
        "segment_id",
        "road_class",
        "signal_id"
    ]

    for col in categorical_columns:

        if col in X.columns:

            X[col] = X[col].astype("category")

    return X
# ============================================================
# LOAD DATASET
# ============================================================

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_DIR = os.path.join(
    BASE_DIR,
    "data",
    "NEURAX_SMART_CITIES_TRAINING_V2"
)


def load_traffic_data():

    traffic_path = os.path.join(
        DATA_DIR,
        "traffic_train.csv"
    )

    if not os.path.exists(traffic_path):
        raise FileNotFoundError(
            f"Traffic dataset not found:\n{traffic_path}"
        )

    traffic = pd.read_csv(
        traffic_path
    )

    traffic["timestamp"] = pd.to_datetime(
        traffic["timestamp"]
    )

    traffic = traffic.sort_values(
        ["segment_id", "timestamp"]
    )

    return traffic