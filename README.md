🧠 AITasker – AI-Powered Task Management System
AITasker es una plataforma inteligente para organizar, priorizar y programar tus tareas diarias, combinando automatización y analítica con el poder de la inteligencia artificial.

🌟 Características Principales
📌 Smart Task Management
Crear, editar y eliminar tareas fácilmente

Importar desde Google Calendar, Outlook, entre otros

Soporte para categorías, etiquetas, subtareas y tareas recurrentes

🧠 Automatización con IA
Priorización automática basada en urgencia, hábitos y patrones de uso

Sugerencia de horarios óptimos según tu calendario

Reprogramación inteligente de tareas incompletas

🔔 Recordatorios & Automatización
Notificaciones por push, email y modal emergente

Bloques de focus time para máxima concentración

Automatización de rutinas diarias

📊 Productividad & Analítica
Visualización del tiempo invertido por categoría

Métricas de completado semanales/mensuales

Mapas de calor y gráficos de enfoque

🌐 Extras Premium
Soporte multilenguaje con traducción instantánea

Asistente de voz integrado

Planificación diaria con GPT-powered assistant

🛠️ Tech Stack
🖼️ Frontend
⚛️ React 18 + Vite

🎨 TailwindCSS

🚀 JavaScript + Semantic HTML

✨ Framer Motion para animaciones fluidas

🔧 Backend
☕ Java 21 + Spring Boot 3

🧱 Arquitectura Hexagonal (Clean Architecture)

🧩 Microservicios con enfoque escalable

🌿 Estrategia de Ramas (Git Branch Strategy)

main         → Releases estables (producción)
└── develop  → Integración continua (staging)
    ├── frontend       → Rama base del frontend
    │   ├── pedro_front
    │   └── gabriel_front
    └── backend        → Rama base del backend
        ├── mateo_backend
        └── pedro_backend
🧪 Flujo de Trabajo
# Cambiar a la rama base
git checkout frontend
git pull origin frontend

# Crear una nueva rama para la feature
git checkout -b feature/mi-feature

# Realizar commit semántico
git commit -m "feat(scheduler): add smart time picker UI"

# Subir cambios y abrir Pull Request
git push origin feature/mi-feature
🎨 UI/UX Design
🎨 Paleta de Colores

{
  "primary": "#06B6D4",
  "accent": "#F472B6",
  "background": "#0F172A",
  "text": "#FFFFFF",
  "secondary": "#94A3B8",
  "success": "#22C55E",
  "danger": "#EF4444"
}
🧾 Componentes Destacados
Tarjetas de tareas con diseño redondeado

🗓️ Calendario inteligente con drag & drop

✨ Etiquetas generadas automáticamente por IA

🚀 Getting Started

🔧 Clonar el repositorio
git clone https://github.com/your-repo/aitasker.git

📦 Instalar dependencias
cd aitasker
npm install
▶️ Ejecutar el servidor de desarrollo
npm run dev
📄 Licencia
MIT © Technovation
Este proyecto está disponible bajo la licencia MIT. Puedes usar, modificar y distribuir libremente este software.
