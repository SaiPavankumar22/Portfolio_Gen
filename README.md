<div align="center">

# PortfolioAI 🚀

### AI-Powered Professional Portfolio Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg)](https://www.mongodb.com/atlas)

> Build stunning, professional portfolios in minutes — powered by AI personality profiling and an intelligent recruiter-facing chatbot.

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Application Walkthrough](#-application-walkthrough)
- [Templates](#-templates)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**PortfolioAI** is a full-stack web application that transforms how professionals present themselves online. Users fill in their background, complete a 20-question personality quiz, choose from 8 professionally designed templates, and instantly generate a polished portfolio page. Each portfolio includes a built-in **AI chatbot representative** that answers recruiter questions based on the user's profile and personality data — 24 hours a day, 7 days a week.

---

## ✨ Features

### 🧠 AI & Smart Features
- **Personality Profiling** — 20 carefully crafted questions across 5 categories build a deep professional profile
- **AI Chatbot Representative** — Keyword-aware chatbot that answers recruiter questions using real profile data
- **Intelligent Template Matching** — 8 templates spanning every industry and design taste

### 🎨 Portfolio Creation
- **Step-by-step Wizard** — Guided 2-step creation flow (template → personality quiz)
- **8 Unique Templates** — Professional, Creative, Corporate, Tech, Design, Academic, Startup, Freelancer
- **8 Color Palettes** — Navy Professional, Forest Nature, Burgundy Elegance, Midnight Tech, Sunset Warmth, Royal Purple, Teal Fresh, Chocolate Luxury
- **Template Gallery** — Filter templates by category with live color-preview thumbnails
- **Full Template Preview** — See exactly how your portfolio will look before generating

### 👤 Profile Management
- **Rich Profile Form** — Full Name, Email, Phone, Location, Professional Title, Summary
- **Skills Tag Manager** — Add/remove skills interactively
- **Social Links** — LinkedIn, GitHub, Website, Twitter
- **File Uploads** — Profile picture and Resume/CV with drag-and-drop support
- **Real-time Save** — Changes are buffered locally and persisted on explicit save

### 📊 Portfolio Dashboard
- **Portfolio Grid** — All portfolios displayed as cards with thumbnails
- **Search & Filter** — Find portfolios by name or filter by status (Draft / Published)
- **Stats Panel** — Total portfolios, total views, published count
- **CRUD Operations** — Create, view, edit, and delete portfolios
- **Status Badges** — Draft / Published status visible at a glance

### 🌙 UX / Design
- **Dark Mode** — Full light/dark theme toggle, persisted in localStorage
- **Animated Landing Page** — Mouse-tracking gradient orbs, floating particles, scroll animations
- **Responsive Design** — Mobile-first layout using Tailwind CSS
- **Auth Flow** — Login / Signup pages with form validation, password visibility toggle

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| [React](https://reactjs.org/) | 18.3 | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | 5.5 | Type safety |
| [Vite](https://vitejs.dev/) | 5.4 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4 | Utility-first styling |
| [React Router DOM](https://reactrouter.com/) | 7.x | Client-side routing |
| [Lucide React](https://lucide.dev/) | 0.344 | Icon library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| [FastAPI](https://fastapi.tiangolo.com/) | 0.111 | REST API framework |
| [Pydantic](https://docs.pydantic.dev/) | ≥2.11 | Data validation & serialisation |
| [PyMongo](https://pymongo.readthedocs.io/) | 4.7 | MongoDB driver |
| [Uvicorn](https://www.uvicorn.org/) | 0.29 | ASGI server |
| [python-dotenv](https://pypi.org/project/python-dotenv/) | 1.0 | Environment variable loading |

### Database
| Technology | Purpose |
|---|---|
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud NoSQL database |

---

## 📁 Project Structure

```
Portfolio-Gen/
├── LICENSE                         ← MIT licence
├── README.md                       ← You are here
├── .gitignore                      ← Git ignore rules
│
├── backend/                        ← FastAPI Python backend
│   ├── app.py                      ← Entry point (CORS + routers)
│   ├── database.py                 ← MongoDB connection
│   ├── requirements.txt            ← Python dependencies
│   ├── .env                        ← Environment secrets (not committed)
│   │
│   ├── models/                     ← Pydantic data models
│   │   ├── user.py                 ← UserProfile, WorkExperience, Education…
│   │   └── portfolio.py            ← Portfolio model
│   │
│   ├── routes/                     ← API route definitions
│   │   ├── profile.py              ← GET /api/profile, POST /api/profile
│   │   └── portfolio.py            ← CRUD /api/portfolios
│   │
│   └── services/                   ← Business / database logic
│       ├── profile_service.py      ← Profile upsert, fetch
│       └── portfolio_service.py    ← Portfolio CRUD, ObjectId handling
│
└── frontend/                       ← React + TypeScript frontend
    ├── index.html                  ← Vite HTML entry point
    ├── vite.config.ts              ← Vite configuration
    ├── tailwind.config.js          ← Tailwind configuration
    ├── tsconfig.json               ← TypeScript configuration
    ├── package.json                ← Node dependencies
    │
    └── src/
        ├── main.tsx                ← React DOM entry
        ├── App.tsx                 ← Root component + routing
        ├── index.css               ← Global styles
        │
        ├── types/
        │   └── index.ts            ← All TypeScript interfaces
        │
        ├── context/
        │   ├── AuthContext.tsx     ← Auth state (login/signup/logout)
        │   └── ThemeContext.tsx    ← Light/dark mode toggle
        │
        ├── data/
        │   └── dummyData.ts        ← Demo profile & personality data
        │
        ├── pages/
        │   ├── LoginPage.tsx       ← Login form
        │   ├── SignupPage.tsx      ← Sign-up form
        │   ├── ProfilePage.tsx     ← Profile settings editor
        │   ├── PortfoliosDashboard.tsx  ← Portfolio management grid
        │   └── PortfolioCreationWizard.tsx ← 2-step portfolio builder
        │
        └── components/
            ├── LandingPage.tsx     ← Animated marketing page
            ├── MainLayout.tsx      ← Sidebar + page outlet wrapper
            ├── Sidebar.tsx         ← Navigation panel
            ├── ProtectedRoute.tsx  ← Auth guard wrapper
            ├── WizardSteps.tsx     ← Step indicator sidebar
            ├── TemplateGallery.tsx ← 8-template selection grid
            ├── TemplatePreview.tsx ← Full-page template preview
            ├── QuestionnaireForm.tsx ← 20-question personality quiz
            ├── PersonalDetailsForm.tsx ← Profile fields form
            ├── FileUpload.tsx      ← Drag-and-drop upload widget
            ├── GeneratedPortfolio.tsx ← Final portfolio renderer
            └── ChatBot.tsx         ← AI recruiter-facing chatbot
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

| Tool | Minimum Version | Check |
|---|---|---|
| Python | 3.11+ | `python --version` |
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| MongoDB | Atlas (free tier works) | [Sign up free](https://www.mongodb.com/atlas) |

---

### Backend Setup

```bash
# 1. Navigate into the backend folder
cd backend

# 2. Create and activate a virtual environment
python -m venv venv

# Windows
.\venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Create your environment file
cp .env.example .env          # then edit .env with your real values
# (If .env.example doesn't exist yet, see Environment Variables below)

# 5. Start the development server with auto-reload
uvicorn app:app --reload
```

The API will be available at **http://localhost:8000**  
Interactive docs (Swagger UI) at **http://localhost:8000/docs**  
Alternative docs (ReDoc) at **http://localhost:8000/redoc**

---

### Frontend Setup

Open a **second terminal**:

```bash
# 1. Navigate into the frontend folder
cd frontend

# 2. Install Node dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 🔐 Environment Variables

### Backend — `backend/.env`

Create this file (never commit it — it is git-ignored):

```env
# MongoDB connection string from Atlas or local MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
```

### Frontend — `frontend/.env` *(optional)*

```env
# Override the backend URL (defaults to http://localhost:8000)
VITE_API_URL=http://localhost:8000
```

> **Note:** For production, set `VITE_API_URL` to your deployed backend URL and update the CORS `allow_origins` list in `backend/app.py`.

---

## 📡 API Reference

Base URL: `http://localhost:8000`  
Full interactive docs: [`/docs`](http://localhost:8000/docs)

### Profile Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/profile/{email}` | Fetch user profile by email | — |
| `POST` | `/api/profile` | Create or update (upsert) a profile | — |

#### `GET /api/profile/{email}`

```http
GET /api/profile/john@example.com
```

**Response `200 OK`**
```json
{
  "_id": "665f1a2b3c4d5e6f7a8b9c0d",
  "personalInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1 555 000 1234",
    "location": "San Francisco, CA",
    "professionalTitle": "Senior Full Stack Developer",
    "summary": "..."
  },
  "skills": ["TypeScript", "React", "Node.js"],
  "experience": [],
  "education": [],
  "projects": [],
  "socialLinks": { "linkedin": "...", "github": "..." },
  "interests": [],
  "selectedTemplate": "modern-minimalist",
  "customizations": { "colorPalette": "navy-blue", ... }
}
```

#### `POST /api/profile`

```http
POST /api/profile
Content-Type: application/json

{ "personalInfo": { "email": "john@example.com", ... }, ... }
```

---

### Portfolio Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/portfolios/{email}` | List all portfolios for a user |
| `POST` | `/api/portfolios` | Create a new portfolio record |
| `PUT` | `/api/portfolios/{id}` | Update an existing portfolio |
| `DELETE` | `/api/portfolios/{id}` | Delete a portfolio |

#### `GET /api/portfolios/{email}`

```http
GET /api/portfolios/john@example.com
```

**Response `200 OK`**
```json
[
  {
    "_id": "665f1a2b...",
    "userId": "john@example.com",
    "name": "Senior Developer Portfolio",
    "template": "modern-minimalist",
    "status": "draft",
    "views": 0,
    "createdAt": "2024-06-01",
    "lastModified": "2024-06-01",
    "thumbnail": ""
  }
]
```

---

## 🗺️ Application Walkthrough

```
Landing Page (/)
   Animated hero with mouse-tracking gradients, feature cards, testimonials
        │
        ▼
   Login (/login)  ─── or ───  Sign Up (/signup)
        │
        ▼
   Portfolio Dashboard (/portfolios)
   ┌─────────────────────────────────────────────────────┐
   │  My Portfolios                          [Create New] │
   │  ┌──────┐  ┌──────┐  ┌──────┐                      │
   │  │Draft │  │Pub.  │  │Draft │  ← search & filter   │
   │  │ View │  │ View │  │ View │                      │
   │  │ Edit │  │ Edit │  │ Edit │                      │
   │  │ Del  │  │ Del  │  │ Del  │                      │
   │  └──────┘  └──────┘  └──────┘                      │
   │  Stats: total / views / published                   │
   └─────────────────────────────────────────────────────┘
        │
        ▼
   Portfolio Creation Wizard (/create-portfolio)
     Step 1 ─ Template Gallery
               Filter by All / Professional / Creative / Tech / etc.
               Hover to Preview • Click to Select
               Live color-palette thumbnail per template
                    │
                    ▼
     Step 2 ─ Personality Quiz (20 questions)
               Categories: Professional Identity • Work Philosophy
                           Career Goals • Collaboration • Development
               Side panel for navigation • Progress bar • Auto-saved answers
               Completion banner when all 20 are answered
                    │
               [Generate Portfolio 🚀]
                    │
                    ▼
   Generated Portfolio (/generated-portfolio/:id)
   ┌──────────────────────────────────────────────────────┐
   │  [Portfolio Tab]          [AI Chat Tab]              │
   │                                                      │
   │  Portfolio Tab:                                      │
   │    Header: Avatar initials, Name, Title, Contact     │
   │    About (summary)                                   │
   │    Experience (timeline with achievements)           │
   │    Projects (grid with tech tags, live/GitHub links) │
   │    Skills (tags)   Education   Connect   Interests  │
   │                                                      │
   │  AI Chat Tab:                                        │
   │    AI Representative introduces themselves           │
   │    Recruiter types questions                         │
   │    Bot responds using profile + personality data     │
   │    Sample question buttons for quick testing         │
   └──────────────────────────────────────────────────────┘
```

---

## 🎨 Templates

| Template | Category | Color Theme | Best For |
|---|---|---|---|
| **Modern Minimalist** | Professional | Navy + Blue | Developers, Analysts |
| **Creative Bold** | Creative | Sunset Orange | Artists, Creatives |
| **Corporate Professional** | Corporate | Navy + Blue | Business, Finance |
| **Tech Developer** | Technology | Midnight Neon | Engineers, DevOps |
| **Designer Showcase** | Design | Royal Purple | UI/UX Designers |
| **Academic Research** | Academic | Forest Green | Researchers, Academics |
| **Startup Entrepreneur** | Business | Teal Fresh | Founders, PMs |
| **Freelancer Multi-Service** | Freelance | Chocolate Gold | Consultants, Freelancers |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. Create a feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Open a **Pull Request**

### Code Style Guidelines

- **Python** — follow PEP 8, keep services and routes properly separated
- **TypeScript/React** — use functional components with hooks
- **Commits** — use [Conventional Commits](https://www.conventionalcommits.org/) format (`feat:`, `fix:`, `docs:`, etc.)

### Reporting Issues

Please open a [GitHub Issue](https://github.com/SaiPavankumar22/Portfolio_Gen/issues) and include:
- Steps to reproduce the bug
- Expected vs actual behaviour
- Browser / OS / Python version

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Made with ❤️ by [SaiPavankumar22](https://github.com/SaiPavankumar22)

⭐ If you found this helpful, consider starring the repo!

</div>
