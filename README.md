<div align="center">

# Creation of Workforce Insights Dashboard for Employee Skill and Analytics

Predict Employee Skills • Analyze Workforce Trends • Empower HR Decisions with Data Analytics
</div>

---

## Project Objective

Develop a Workforce Insights Dashboard to analyze employee skills, workforce performance, and HR metrics through interactive visualizations, enabling organizations to make informed, data-driven decisions.

## 🗄️ Milestone 1: Database Setup Instructions

To ensure the entire team is working with the same database architecture, please follow these steps to set up the `WorkforceAnalyticsDB` locally.

### Prerequisites
* MySQL Server & MySQL Workbench installed.
* `HR_Analytics_Cleaned.csv` dataset downloaded to your machine.

### Step-by-Step Setup
1. **Create the Schema:** Open `Milestone1_schema_query.sql` in MySQL Workbench and execute the script to build the database and tables.
2. **Import Data:** In the Navigator panel, refresh your schemas. Right-click the `hr_employee_data` table, select **Table Data Import Wizard**, and upload the cleaned CSV file.
3. **Validate:** Open and run `Milestone2_validation_query.sql`. Check the Result Grid to verify the baseline metrics (Total Employees: 1,470 | Attrition Rate: 16.12%).


# 🤖 Milestone 2: AI Analytics & Predictive Intelligence
Follow these steps to set up and run the system:

# Step-by-Step Setup
Step 1: Install Python
Ensure you have Python 3.10 or higher installed.

To check if Python is installed, open your terminal (Command Prompt/PowerShell on Windows, or Terminal on macOS/Linux) and run:
bash
python --version
If it is not installed or version is older, download and install the latest Python 3.10+ from python.org.
Step 2: Open your Terminal in the Project Folder
Open your command line/terminal and navigate to the project directory:

powershell
cd "c:\Users\anil5\Desktop\New folder"
Step 3: Install Required Dependencies
Run the following command to install all the necessary libraries:

bash
pip install pandas openpyxl scikit-learn xgboost joblib fastapi uvicorn httpx python-dotenv openai
Step 4: Configure the Environment Variables (Optional)
The system has a .env file in the root directory:

Open 

.env
.
If you want to use the AI-powered search (RAG), add your OpenAI API key:
text
OPENAI_API_KEY=your_actual_api_key_here
Note: If you do not have an OpenAI API key, the system will automatically fall back to a local rules-based keyword extractor, meaning it will still work offline without any key!
Step 5: Run the Code
You can now run any of the following components:

Run the Weekly Automation Agent (scans employees for attrition risk and creates reports):

bash
python scripts/run_agent.py
This reads the dataset, calculates predictions, and creates a report.

Start the Web API Server:

bash
uvicorn app.main:app --reload
Once it starts, open your browser and navigate to http://127.0.0.1:8000/docs to see and test the interactive API interface.

Run the Automated Tests:

bash
python tests/test_api.py
This validates that all components are working as expected.




