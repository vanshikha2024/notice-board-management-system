
# 📢 Notice Board Management System

A full-stack Notice Board Management System built using **Next.js (Pages Router)**, **Prisma ORM**, and **TiDB Cloud (MySQL-compatible database)**.

## 🚀 Features

- Create Notice
- View All Notices
- Edit Existing Notice
- Delete Notice with Confirmation
- Search Notices by Title
- Filter Notices by Category
- Urgent Notice Badge
- Statistics Dashboard
- Responsive UI
- Glassmorphism Design

---

## 🛠️ Tech Stack

- Next.js (Pages Router)
- React.js
- Prisma ORM
- TiDB Cloud Database
- JavaScript
- CSS

---

## 📂 Project Structure

```text
pages/
│
├── api/
│   └── notices/
│       ├── index.js
│       └── [id].js
│
├── _app.js
├── _document.js
└── index.js

prisma/
└── schema.prisma

styles/
└── globals.css
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd notice-board-management-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variable

Create a `.env` file:

```env
DATABASE_URL="your_tidb_connection_string"
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Push Database Schema

```bash
npx prisma db push
```

### 6. Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 📌 Notice Fields

Each notice contains:

- Title
- Body
- Category (Academic / Event / General)
- Priority (Urgent / Normal)
- Publish Date

---

## ✅ Implemented Functionalities

### Create Notice
Users can add new notices through the form.

### Read Notice
All notices are displayed as responsive cards.

### Update Notice
Existing notices can be edited using the same form.

### Delete Notice
Users can delete notices after confirmation.

### Search
Users can search notices by title.

### Category Filter
Users can filter notices by category.

### Statistics Dashboard
Displays:

- Total Notices
- Urgent Notices
- Academic Notices
- Event Notices

### Urgent Badge
Urgent notices are highlighted using a red badge.

---

## 🎨 UI Features

- Glassmorphism Design
- Responsive Layout
- Dashboard Statistics Cards
- Category Color Badges
- Urgent Priority Highlighting
- Clean and User-Friendly Interface

---

## 🔮 One Thing I Would Improve With More Time

If given more time, I would:

- Add image upload support for notices
- Add pagination for large datasets
- Add authentication and admin roles
- Add advanced filtering and sorting options
- Improve accessibility and animations

---

## 🤖 AI Usage

AI tools were used to:

- Understand Prisma ORM concepts
- Debug CRUD API routes
- Improve UI styling and responsiveness
- Refactor React components
- Generate ideas for dashboard statistics and filtering

All generated suggestions were manually reviewed, modified, tested, and integrated into the final application.

---

## 👩‍💻 Author

**Vanshikha**

B.Tech Computer Science Engineering  
Banasthali Vidyapith

LinkedIn:  
www.linkedin.com/in/vanshikha-b2037b2b7
