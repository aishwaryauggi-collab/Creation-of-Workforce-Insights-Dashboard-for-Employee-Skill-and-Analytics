# Talent Intelligence & Workforce Analytics Platform

An end-to-end predictive workforce analytics system. The platform combines machine learning classification, automated talent scanning, and a RAG (Retrieval-Augmented Generation) query system to help HR managers identify at-risk staff, diagnose workforce health, and lookup company policies.

---

## 📁 System Architecture & Directory Layout

```text
New folder/
├── data/
│   └── encoded_data.xlsx    # Enriched dataset containing engineered metrics and dummy columns
├── docs/
│   └── hr_policies.txt      # Knowledge base for RAG containing training, work-life, and promotion policies
├── models/
│   ├── lr_model.joblib      # Saved Logistic Regression classification model
│   ├── rf_model.joblib      # Saved Random Forest baseline model
│   ├── xgb_model.joblib     # Saved XGBoost baseline model
│   ├── scaler.joblib        # StandardScaler instance for feature standardization
│   ├── feature_names.joblib # Serialized ordered list of training features
│   └── validation_metrics.json # Calculated test-set evaluation scores
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI web backend containing predictive and search endpoints
│   ├── rag.py               # RAG indexing, search vectorizer, and QA fallback engine
│   └── agent.py             # Talent scanning scanner that runs weekly assessments
├── scripts/
│   └── run_agent.py         # Entry point script to trigger weekly report generation
├── tests/
│   └── test_api.py          # Integration tests for FastAPI endpoints
├── .env                     # Configuration file housing the OpenAI API key
└── README.md                # System documentation manual
```

---

## 🧠 Machine Learning & Data Pipeline (Steps 1–5)

### 1. Data Prep & Feature Encoding
Categorical variables are handled to prepare the 1,470-row HR dataset for the classifiers:
*   **Binary Mapping:** `Attrition` (`Yes` ➔ `1`, `No` ➔ `0`), `OverTime` (`Yes` ➔ `1`, `No` ➔ `0`), and `Gender` (`Male` ➔ `1`, `Female` ➔ `0`).
*   **One-Hot Encoding:** Variables including `Department`, `JobRole`, `MaritalStatus`, `BusinessTravel`, `EducationField`, and dynamic age/tenure categories are encoded into **57 binary features**.
*   **Feature Scaling:** Standardized using `StandardScaler` to bring all values to $\mu = 0$ and $\sigma = 1$, which is critical for distance-based estimators like Logistic Regression.

### 2. Model Evaluation
Models are fit on a stratified 80/20 train/test split. Predictive performance results on the test set (294 employees) are detailed below:

| Metric | Logistic Regression | Random Forest | XGBoost |
| :--- | :---: | :---: | :---: |
| **Accuracy** | 76.87% | **83.67%** | 82.65% |
| **Precision** | 37.65% | 42.86% | **44.74%** |
| **Recall (Class 1)** | **68.09%** | 6.38% | 36.17% |
| **F1-Score** | **48.48%** | 11.11% | 40.00% |
| **ROC-AUC** | **80.58%** | 77.53% | 76.07% |

*   **Logistic Regression (Active Model):** Selected as the primary model due to its high **Recall (68.09%)** and **ROC-AUC (80.58%)**. In HR risk-flagging scenarios, capturing a true positive (an employee who leaves) is prioritized over avoiding false positives, making recall the key performance metric.
*   **Confusion Matrices:**
    *   *Logistic Regression:* 194 True Negatives, 32 True Positives, 53 False Positives, 15 False Negatives.
    *   *Random Forest:* 243 True Negatives, 3 True Positives, 4 False Positives, 44 False Negatives.
    *   *XGBoost:* 226 True Negatives, 17 True Positives, 21 False Positives, 30 False Negatives.

### 3. Diagnostic Health & Skill-Gap Scoring
Three business metrics are computed and stored in [encoded_data.xlsx](file:///c:/Users/anil5/Desktop/New%20folder/encoded_data.xlsx):
*   **Skill Gap Flag:** Sets `Skill_Gap_Flag = 1` for employees meeting `TrainingTimesLastYear <= 1` and `PerformanceRating <= 3` (7.2% of the workforce).
*   **Promotion Ready Flag:** Sets `Promotion = 1` for employees meeting `YearsSinceLastPromotion >= 3`, `PerformanceRating >= 3`, and `JobLevel < 5` (23.1% of the workforce).
*   **Workforce Health Score:** Computed as a weighted index:
    $$\text{Health Score Raw} = 0.30 \times \text{JobSatisfaction} + 0.20 \times \text{TrainingTimesLastYear}_{\text{norm}} + 0.25 \times \text{PerformanceRating} + 0.25 \times \text{WorkLifeBalance}$$
    Where:
    $$\text{TrainingTimesLastYear}_{\text{norm}} = 1.0 + \left(\frac{\text{TrainingTimesLastYear}}{6.0}\right) \times 3.0$$
    The raw score is normalized on a scale of 0 to 100:
    $$\text{Health Score} = \left(\frac{\text{Health Score Raw} - 1.0}{3.0}\right) \times 100$$
    *   `>= 75`: **Healthy**
    *   `50-74`: **Moderate**
    *   `< 50`: **At-Risk**

---

## 🌐 API Endpoint Documentation (Step 6)

The web backend is built using **FastAPI** and hosted via **Uvicorn**.

### 1. `POST /predict-attrition`
Accepts a list of employee profiles, standardizes inputs, and runs inference. Returns predictions and log-odds contributions explaining the model's output.

*   **Mathematical Explanation:** The contribution $C_i$ of scaled feature $i$ is calculated as:
    $$C_i = w_i \times X_{\text{scaled}, i}$$
    Where $w_i$ is the coefficient of feature $i$ in the Logistic Regression model. Features with high positive contributions increase the attrition log-odds (risk drivers), while negative contributions lower it (retention drivers).

*   **Request Example:**
    ```json
    [
      {
        "Age": 30.0,
        "Department": "Sales",
        "JobRole": "Sales Representative",
        "MonthlyIncome": 2500.0,
        "OverTime": "Yes",
        "JobSatisfaction": 2,
        "TotalWorkingYears": 5.0
      }
    ]
    ```
*   **Response Example:**
    ```json
    {
      "predictions": [
        {
          "employee_index": 0,
          "attrition_prediction": 0,
          "attrition_probability": 0.3573,
          "xgb_probability_ref": 0.4124,
          "risk_score_category": "Medium Risk",
          "top_risk_drivers": [
            { "feature": "OverTime", "contribution": 1.2592 },
            { "feature": "TotalWorkingYears", "contribution": 0.7017 }
          ],
          "top_retention_drivers": [
            { "feature": "EducationField_Life Sciences", "contribution": -0.6479 }
          ]
        }
      ]
    }
    ```

### 2. `POST /health-score`
Computes the workforce health score category.
*   **Request Example:**
    ```json
    {
      "JobSatisfaction": 3,
      "TrainingTimesLastYear": 2,
      "PerformanceRating": 4,
      "WorkLifeBalance": 2
    }
    ```
*   **Response Example:**
    ```json
    {
      "health_score_raw": 2.8,
      "health_score": 60.0,
      "category": "Moderate"
    }
    ```

### 3. `POST /query`
RAG endpoint to query the company HR handbook.
*   **Request Example:**
    ```json
    {
      "query": "What are the rules regarding hybrid and remote work?"
    }
    ```
*   **Response Example:**
    ```json
    {
      "query": "What are the rules regarding hybrid and remote work?",
      "answer": "According to the Work-Life Balance Guidelines:\n- Remote work: Full-time employees are eligible for hybrid work, allowing up to 2 days of remote work per week, subject to team performance and manager approval.",
      "source": "Local Fallback Generator (No API Key)"
    }
    ```

---

## 🔍 RAG Vector Search & Fallback Engine (Step 7)

To lookup company HR policies, the system utilizes a Retrieval-Augmented Generation (RAG) pipeline:
1.  **Parsing & Chunking:** The [hr_policies.txt](file:///c:/Users/anil5/Desktop/New%20folder/docs/hr_policies.txt) handbook is split into sections based on topics (Training, Work-Life, Promotions, Retention).
2.  **Indexing:** Uses a **TF-IDF Vectorizer** (from `scikit-learn`) to transform policy chunks into sparse vectors.
3.  **Retrieval:** Computes **Cosine Similarity** between the TF-IDF representation of the user query and the policy database to return the top 2 matching chunks.
4.  **Generative Fallback Design:**
    *   If `OPENAI_API_KEY` is present, it formats the context and queries a GPT completions model to generate a natural answer.
    *   If the key is missing or calls fail (e.g. **Error code: 429** due to exhausted balance), the query is routed to a rule-based query parser that extracts the relevant text, ensuring the application remains robust.

---

## 🤖 Agentic Weekly Automation (Step 8)

The weekly scanner run-loop is triggered via `scripts/run_agent.py`. It:
1.  Loads the preprocessed Excel database.
2.  Scales features and runs predictions for all employees.
3.  Identifies high-risk employees (attrition probability >= 50%).
4.  Collects active skill-gaps and promotion candidates.
5.  Generates a detailed summary saved to [weekly_report_latest.md](file:///c:/Users/anil5/Desktop/New%20folder/reports/weekly_report_latest.md).

---

## ⚙️ Setup & Execution Guide

### Installation
Ensure you have Python 3.10+ installed and install the required dependencies:
```bash
pip install pandas openpyxl scikit-learn xgboost joblib fastapi uvicorn httpx python-dotenv
```

### Running Commands
*   **Run Weekly Agent Scanner:**
    ```bash
    python scripts/run_agent.py
    ```
*   **Start Local FastAPI Development Server:**
    ```bash
    uvicorn app.main:app --reload
    ```
*   **Run Integration Tests:**
    ```bash
    python tests/test_api.py
    ```
