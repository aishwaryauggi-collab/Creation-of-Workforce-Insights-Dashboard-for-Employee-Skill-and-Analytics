
# Workforce Insights Dashboard

A React-based workforce analytics dashboard for exploring employee performance, attrition risk, workforce health, skill gaps, promotion readiness, and HR policies.

## Features

- Role-based demo login for HR users
- Workforce overview dashboard
- Department and timeframe filters
- Attrition and retention workspace
- Employee performance workspace
- Diversity, Equity, and Inclusion workspace
- Recruitment and talent flow workspace
- AI-powered HR Policy Assistant
- RAG-based policy search through the FastAPI backend
- Responsive desktop and mobile layout

## Technology Stack

- React 19
- Vite
- React Router
- Tailwind CSS
- Lucide React
- ESLint
- FastAPI backend integration

## Project Structure

```text
frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── context/
│   │   └── `AuthContext.jsx`
│   ├── pages/
│   │   ├── `AiAssistantPage.jsx`
│   │   ├── LoginPage.jsx
│   │   └── OverviewPage.jsx
│   ├── `App.jsx`
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── `package.json`
└── vite.config.js
```

## Prerequisites

Install the following:

- Node.js 18 or newer
- npm
- Workforce Insights FastAPI backend for AI Assistant functionality

Check installed versions:

```bash
node --version
npm --version
```

## Installation

Open a terminal in the `frontend` directory and install dependencies:

```bash
npm install
```

## Run the Development Server

Start the Vite development server:

```bash
npm run dev
```

Open the URL shown in the terminal. The default address is:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```

Starts the development server with hot module replacement.

```bash
npm run build
```

Creates an optimized production build in the `dist` directory.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint against the frontend source code.

## Backend Integration

The AI Assistant connects to the FastAPI backend at:

```text
http://127.0.0.1:8000
```

Start the backend from the repository root:

```bash
cd ml
uvicorn app.main:app --reload
```

Open the backend API documentation at:

```text
http://127.0.0.1:8000/docs
```

The frontend uses these backend endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | Checks whether the backend is online |
| `POST` | `/query` | Sends HR policy questions to the RAG assistant |
| `POST` | `/health-score` | Calculates a workforce health score |
| `POST` | `/predict-attrition` | Predicts employee attrition risk |

If the backend is unavailable, the AI Assistant displays an offline fallback message.

## Application Routes

| Route | Description |
|---|---|
| `/` | Login page |
| `/dashboard` | Workforce overview |
| `/retention` | Attrition and retention workspace |
| `/performance` | Employee performance workspace |
| `/dei` | Diversity, Equity, and Inclusion workspace |
| `/recruitment` | Recruitment and talent flow workspace |
| `/ai-assistant` | HR policy and workforce intelligence assistant |

## Demo Login

The login page uses demo authentication and stores the session in browser `localStorage`.

After logging in, protected dashboard routes become available. Logging out removes the saved browser session.

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The generated files are placed in:

```text
frontend/dist/
```

The `dist` and `node_modules` directories are excluded from version control.

## Validation

Before submitting frontend changes, run:

```bash
npm run lint
npm run build
```

Both commands should complete successfully.

## Related Documentation

- [Main project README](.`README.md`)
- [Machine learning and API documentation](.`README.md`)
