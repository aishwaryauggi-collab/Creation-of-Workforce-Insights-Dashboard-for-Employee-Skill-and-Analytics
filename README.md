<div align="center">

# Creation of Workforce Insights Dashboard for Employee Skill and Analytics

Predict Employee Skills • Analyze Workforce Trends • Empower HR Decisions with Data Analytics

</div>

---

## Project Objective

Develop a Workforce Insights Dashboard to analyze employee skills, workforce performance, and HR metrics through interactive visualizations, enabling organizations to make informed, data-driven decisions.

---

# Milestone 1: Database Setup Instructions

To ensure the entire team is working with the same database architecture, please follow these steps to set up the `WorkforceAnalyticsDB` locally.

## Prerequisites

Before starting, make sure you have the following installed and available:

* MySQL Server
* MySQL Workbench
* `HR_Analytics_Cleaned.csv` dataset downloaded to your machine

---

## Step-by-Step Setup

### Step 1: Create the Schema

Open the `Milestone1_schema_query.sql` file in MySQL Workbench.

Execute the complete SQL script to create the `WorkforceAnalyticsDB` database and all required tables.

---

### Step 2: Import the Dataset

After creating the database:

1. Refresh the Schemas section in MySQL Workbench.
2. Locate the `hr_employee_data` table.
3. Right-click on the table.
4. Select **Table Data Import Wizard**.
5. Choose the `HR_Analytics_Cleaned.csv` file from your system.
6. Complete the import process.

---

### Step 3: Validate the Database

Open and execute:

```text
Milestone2_validation_query.sql
```

Check the Result Grid to verify the baseline metrics.

Expected results:

* Total Employees: `1,470`
* Attrition Rate: `16.12%`

If the values match, the database setup has been completed successfully.

---

# Milestone 2: AI Analytics & Predictive Intelligence

Follow the steps below to set up and run the AI analytics and predictive intelligence system.

## Step-by-Step Setup

### Step 1: Install Python

Ensure that Python `3.10` or higher is installed on your system.

To check the installed Python version, open your terminal and run:

```bash
python --version
```

If Python is not installed, or the installed version is older than Python 3.10, install Python 3.10 or a newer version.

---

### Step 2: Open the Terminal in the Project Folder

Open Command Prompt or PowerShell and navigate to the project directory:

```powershell
cd "c:\Users\anil5\Desktop\New folder"
```

Make sure you are inside the main project folder before continuing.

---

### Step 3: Install Required Dependencies

Run the following command to install all required Python libraries:

```bash
pip install pandas openpyxl scikit-learn xgboost joblib fastapi uvicorn httpx python-dotenv openai
```

Wait for all dependencies to install successfully before moving to the next step.

---

### Step 4: Configure Environment Variables

The project contains a `.env` file in the root directory.

Open the `.env` file.

If you want to use the AI-powered search using RAG, add your OpenAI API key:

```text
OPENAI_API_KEY=your_actual_api_key_here
```

If you do not have an OpenAI API key, the system will automatically use a local rules-based keyword extractor.

This means the system can still work offline without an API key.

---

### Step 5: Run the Project Components

You can now run any of the following components depending on what you want to test.

---

## Run the Weekly Automation Agent

The automation agent scans employee data, identifies attrition risk, and creates reports.

Run:

```bash
python scripts/run_agent.py
```

This process:

* Reads the employee dataset
* Calculates predictions
* Identifies employee attrition risk
* Generates the required report

---

## Start the Web API Server

Start the FastAPI server using:

```bash
uvicorn app.main:app --reload
```

Once the server starts successfully, open the interactive API documentation in your browser:

```text
http://127.0.0.1:8000/docs
```

From there, you can view and test the available API endpoints.

---

## Run the Automated Tests

To verify that the complete system is working correctly, run:

```bash
python tests/test_api.py
```

This validates the major components and API functionality of the project.
