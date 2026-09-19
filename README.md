# Traffic Setu – Predict. Prevent. Redirect
AI-powered decision-support system for detecting urban congestion, identifying abnormal traffic behaviour, forecasting traffic conditions, recommending adaptive diversions, and simulating long-term network improvements.
1. Problem Statement Urban traffic networks are constantly changing.
The time-slices at the states can change within minutes based on peak-hour demand, incidents, road works, weather, special events, road capacity constraints, and congestion spillback on adjacent / impact roads. Existing traffic monitoring systems mostly provide immediate traffic state. 
The objective of this project is to build a software-only AI-powered decision-support system that analyzes traffic and road-network data to:
•	Detect congestion and abnormal traffic behavior.
•	Identify or classify traffic incidents where the available data supports it.
•	Forecast traffic conditions 15–60 minutes ahead.
•	Generate evidence-based traffic diversion and operational advisories.
•	Identify recurring bottlenecks in the road network.
•	Simulate possible infrastructure or network modifications and estimate their impact.
2. Proposed Solution
TrafficSetu is a software-only AI traffic intelligence and simulation platform. It takes the traffic and road-network datasets provided by the organizers and continuously analyzes them to build a live picture of network conditions.
The main objective is to transform raw traffic data into actionable information.
Our system follows:
Observe → Detect → Predict → Recommend → Simulate
The system works in stages:
1. Detect — Identifies congestion and abnormal traffic patterns, 
   and where the data supports it, flags possible incidents.
2. Forecast — Predicts traffic conditions 15, 30, 45, and 60 
   minutes into the future.
3. Recommend — Based on current and predicted conditions, generates 
   evidence-based diversion advisories and identifies recurring 
   bottlenecks.
4. Simulate — For recurring problems, simulates possible 
   road-network modifications and shows estimated before-and-after 
   impact on metrics like travel time, speed, and congestion.
3. Project Approach
Our approach is organized into six stages: data understanding, preprocessing, modelling, recommendation generation, evaluation, and visualization.
•	Data Analysis - Study the traffic and road-network data-sets to gain an understanding of traffic flow, road conditions and other factors/features. 
•	Data Preparation - Clean the data, deal with missing/noisy data, and prepare the data-set for the AI/ML algorithms.
•	Modelling - Create models for congestion/incident detection and 15-60 minute traffic forecasting. 
•	Decision-making - Based on detected and predicted traffic conditions, generate evidence-based diversion advisories and pinpointing systemic bottlenecks.
•	Evaluation - Provide detection and forecasting performance assessment, robustness to noisy/synthetic data, and accuracy of system decisions. 
•	Visualization - Visualize traffic condition, incident, forecast, recommendation, and impact simulation on one interactive screen.

AI-powered decision-support system for detecting urban congestion, identifying abnormal traffic behavior, forecasting traffic conditions, recommending adaptive diversions, and simulating long-term network improvements.


## 1. Problem Statement Urban traffic networks are constantly changing.
The time-slices at the states can change within minutes based on peak-hour demand, incidents, road works, weather, special events, road capacity constraints, and congestion spillback on adjacent / impact roads. Existing traffic monitoring systems mostly provide immediate traffic state. 
The objective of this project is to build a software-only AI-powered decision-support system that analyzes traffic and road-network data to:
•	Detect congestion and abnormal traffic behavior.
•	Identify or classify traffic incidents where the available data supports it.
•	Forecast traffic conditions 15–60 minutes ahead.
•	Generate evidence-based traffic diversion and operational advisories.
•	Identify recurring bottlenecks in the road network.
•	Simulate possible infrastructure or network modifications and estimate their impact.


## 2. Proposed Solution
TrafficSetu is a software-only AI traffic intelligence and simulation platform. It takes the traffic and road-network datasets provided by the organizers and continuously analyzes them to build a live picture of network conditions.
The main objective is to transform raw traffic data into actionable information.
Our system follows:
Observe → Detect → Predict → Recommend → Simulate
The system works in stages:

### 1. Detect — Identifies congestion and abnormal traffic patterns, 
   and where the data supports it, flags possible incidents.

### 2. Forecast — Predicts traffic conditions 15, 30, 45, and 60 
   minutes into the future.

### 3. Recommend — Based on current and predicted conditions, generates 
   evidence-based diversion advisories and identifies recurring 
   bottlenecks.

### 4. Simulate — For recurring problems, simulates possible 
   road-network modifications and shows estimated before-and-after 
   impact on metrics like travel time, speed, and congestion.


## 3. Project Approach
Our approach is organized into six stages: data understanding, preprocessing, modelling, recommendation generation, evaluation, and visualization.

•	Data Analysis - Study the traffic and road-network data-sets to gain an understanding of traffic flow, road conditions and other factors/features. 

•	Data Preparation - Clean the data, deal with missing/noisy data, and prepare the data-set for the AI/ML algorithms.

•	Modelling - Create models for congestion/incident detection and 15-60 minute traffic forecasting. 

•	Decision-making - Based on detected and predicted traffic conditions, generate evidence-based diversion advisories and pinpointing systemic bottlenecks.

•	Evaluation - Provide detection and forecasting performance assessment, robustness to noisy/synthetic data, and accuracy of system decisions. 

•	Visualization - Visualize traffic condition, incident, forecast, recommendation, and impact simulation on one interactive screen.


## 4. Project Structure

```text
trafficsetu/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TrafficMap.jsx
│   │   │   ├── TrafficStatus.jsx
│   │   │   ├── IncidentAlert.jsx
│   │   │   ├── ForecastChart.jsx
│   │   │   └── RecommendationCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── main.py
│   │
│   ├── api/
│   │   ├── traffic.py
│   │   ├── prediction.py
│   │   └── recommendations.py
│   │
│   ├── models/
│   │   ├── congestion_model.py
│   │   ├── incident_model.py
│   │   └── forecasting_model.py
│   │
│   ├── services/
│   │   ├── traffic_service.py
│   │   ├── recommendation_service.py
│   │   └── simulation_service.py
│   │
│   └── utils/
│       └── preprocessing.py
│
├── data/
│   ├── raw/
│   └── processed/
│
├── notebooks/
│   └── exploratory_analysis.ipynb
│
├── models/
│   └── trained_models/
│
├── requirements.txt
├── .gitignore
└── README.md
```

## 5. ## System Architecture

```text
ORGANIZER UPLOADS DATASET PACKAGE
              │
              ▼
       ┌───────────────┐
       │   FRONTEND    │
       └───────┬───────┘
               │
               ▼
       ┌───────────────┐
       │    BACKEND    │
       │ File handling │
       └───────┬───────┘
               │
               ▼
        LAYER 1
      DATA PROCESSING
               │
      ┌────────┼─────────┐
      ▼        ▼         ▼
   Traffic   Network   Context
      │        │         │
      └────────┼─────────┘
               │
               ▼
        LAYER 2
   TRAFFIC INTELLIGENCE
               │
       ┌───────┴────────┐
       ▼                ▼
  Current traffic    Forecasting
                     15–60 min
                         │
                    LightGBM/
                     XGBoost
                         │
                         ▼
                  Future traffic
               │
               ▼
        LAYER 3
   NETWORK UNDERSTANDING
               │
       Network + demand
       + restrictions
       + signals
               │
               ▼
      Propagation analysis
               │
               ▼
        LAYER 4
    DECISION SUPPORT
               │
               ▼
       Diversion/
       traffic advisory
               │
               ▼
        LAYER 5
   BOTTLENECK + SIMULATION
               │
       Planning candidates
               │
               ▼
       Before / After
         comparison
               │
               ▼
          DASHBOARD
```

## 6. @License
This project is developed for NEURAX HACKATHON 3.0.
Dataset licenses and third-party resources remain subject to their respective licenses.
