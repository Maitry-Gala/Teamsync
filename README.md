# TeamSync

> Team collaboration, done right. Workspaces, tasks, and role-based access — all in one place.

---

## 📌 Overview

TeamSync is a full-stack MERN application designed to simulate production-grade SaaS collaboration platforms like Jira or Asana. It supports multiple workspaces per user, team invitations, task management with priorities, and a rich analytics dashboard — all wrapped in a clean, responsive UI.

---

## 🌟 Features

- 🔐 **Authentication** — Google OAuth Sign-In + Email/Password login with cookie-based session management
- 🏢 **Multi-Workspace Support** — Create and manage multiple independent workspaces
- 📊 **Projects & Epics** — Organize work into projects and break them into epics
- ✅ **Task Management** — Full CRUD for tasks with status, priority, and assignee support
- 👥 **Role-Based Permissions** — Owner, Admin, and Member roles with scoped access
- ✉️ **Member Invitations** — Invite team members directly to workspaces
- 🔍 **Filters & Search** — Filter tasks by status, priority, and assignee
- 📈 **Analytics Dashboard** — Visual insights into project and task progress
- 📅 **Pagination & Load More** — Efficient data loading for large datasets
- 🚪 **Session Termination** — Secure logout with full session cleanup
- 🌱 **Database Seeding** — Pre-built seeders for test data
- 💾 **Mongoose Transactions** — Data integrity across complex operations

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React.js + TypeScript | UI framework with type safety |
| Vite.js | Fast development & build tool |
| TailwindCSS | Utility-first styling |
| Shadcn UI | Accessible component library |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| TypeScript | Type-safe backend |
| MongoDB + Mongoose | Database & ODM |
| Google OAuth | Authentication |

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Google OAuth credentials

### 1. Clone the repository
```bash
git clone https://github.com/your-username/teamsync.git
cd teamsync
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env   # Fill in your environment variables
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
cp .env.example .env   # Fill in your environment variables
npm run dev
```

---

## 🔑 Environment Variables

### Backend `.env`
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
CLIENT_URL=http://localhost:5173
```

### Frontend `.env`
```
VITE_API_BASE_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 🌐 Deployment

> 🚧 Deployment coming soon

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.
