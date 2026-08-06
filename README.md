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

