🧠 AItasker - AI-Powered Task Management System
An intelligent platform to organize, prioritize, and schedule daily tasks using artificial intelligence.

🌟 Key Features
📌 Smart Task Management
Create, edit, and delete tasks

Import from Google Calendar, Outlook, and more

Categories, tags, subtasks, and recurring tasks

🧠 AI-Powered Automation
Automatic prioritization based on urgency and habits

Optimal time slot suggestions

Auto-rescheduling for incomplete tasks

🔔 Reminders & Automation
Push, email, and popup notifications

Focus time blocks for deep work

📊 Productivity Analytics
Time spent by category

Weekly/monthly completion metrics

Heatmaps and focus graphs

🌐 Premium Extras
Multi-language with instant translation

Voice assistant and mobile sync

GPT integration for daily planning

🛠️ Tech Stack
Frontend
⚛️ React 18 + Vite

🎨 TailwindCSS

🚀 JavaScript + Semantic HTML

✨ Framer Motion (animations)

Backend
☕ Java 21 + Spring Boot 3

🏗️ Hexagonal Architecture (Clean Architecture)

🧩 Microservices

🌿 Git Branch Strategy
Structure
main                → Stable releases (production)  
└── develop         → Continuous integration (staging)  
    ├── frontend    → Frontend base branch  
    │   ├── pedro_front  
    │   └── gabriel_front  
    └── backend     → Backend base branch  
        ├── mateo_backend  
        └── pedro_backend  
Workflow
Sync base branch:

bash
git checkout frontend
git pull origin frontend
Create feature branch:

bash
git checkout -b feature/your-feature
Semantic commits:

bash
git commit -m "feat(scheduler): add smart time picker UI"
Push & open PR:

bash
git push origin feature/your-feature
🎨 UI/UX Design
Color Palette
{
  "primary": "#06B6D4",
  "accent": "#F472B6",
  "background": "#0F172A",
  "text": "#FFFFFF",
  "secondary": "#94A3B8",
  "success": "#22C55E",
  "danger": "#EF4444"
}
Components
🧾 Rounded task cards

🗓️ Smart calendar with drag & drop

✨ AI-generated smart labels

🚀 Getting Started
Clone the repo:

git clone https://github.com/your-repo/aitasker.git
Install dependencies:

cd aitasker && npm install
Run dev server:

npm run dev

📄 License MIT ©
