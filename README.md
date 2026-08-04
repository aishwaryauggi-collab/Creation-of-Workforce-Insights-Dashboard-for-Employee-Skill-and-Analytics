<div align="center">

# AI-Powered Workforce Analytics & Talent Intelligence Dashboard

*Predict Employee Attrition • Analyze Workforce Trends • Empower HR Decisions with AI*

</div>

---

## Project Objective

Develop an AI-powered system to analyze workforce data, predict employee attrition, and provide HR insights through an interactive dashboard.

## 🗄️ Milestone 1: Database Setup Instructions

To ensure the entire team is working with the same database architecture, please follow these steps to set up the `WorkforceAnalyticsDB` locally.

### Prerequisites
* MySQL Server & MySQL Workbench installed.
* `HR_Analytics_Cleaned.csv` dataset downloaded to your machine.

### Step-by-Step Setup
1. **Create the Schema:** Open `Milestone1_schema_query.sql` in MySQL Workbench and execute the script to build the database and tables.
2. **Import Data:** In the Navigator panel, refresh your schemas. Right-click the `hr_employee_data` table, select **Table Data Import Wizard**, and upload the cleaned CSV file.
3. **Validate:** Open and run `Milestone2_validation_query.sql`. Check the Result Grid to verify the baseline metrics (Total Employees: 1,470 | Attrition Rate: 16.12%).

