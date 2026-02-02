📇 Contact Management System – Backend (SESD Workshop)

A full-fledged CRUD backend application built using Node.js, Express, PostgreSQL, Prisma ORM, and TypeScript, following Object-Oriented Programming (OOP) principles and a clean layered architecture.

This project is developed as part of the SESD Workshop Assignment, focusing on real-world backend practices such as authentication, validation, clean error handling, and advanced query features.

🚀 Features
✅ Core CRUD Operations

Create Contact

Get Single Contact

Get All Contacts

Update Contact

Delete Contact

🔍 Advanced Features

Search (by name, phone, email)

Filtering (category, favorite)

Sorting (name, createdAt)

Pagination (page & limit)

🔐 Authentication (Bonus)

User Registration & Login

Password hashing using bcrypt

JWT-based authentication

Protected routes

Users can access only their own contacts

🧱 Clean Architecture

Controllers → Services → Repositories

Prisma ORM used only in repositories

Centralized error handling

Reusable API response structure

🛠 Tech Stack

Node.js

Express.js

TypeScript

PostgreSQL

Prisma ORM

JWT Authentication

bcrypt

express-validator

dotenv, cors, helmet, morgan

📁 Project Structure
sesd_project/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   │   ├── AuthController.ts
│   │   └── ContactController.ts
│   │
│   ├── services/
│   │   ├── AuthService.ts
│   │   └── ContactService.ts
│   │
│   ├── repositories/
│   │   ├── BaseRepository.ts
│   │   ├── UserRepository.ts
│   │   └── ContactRepository.ts
│   │
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   └── contactRoutes.ts
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.ts
│   │   └── errorMiddleware.ts
│   │
│   ├── utils/
│   │   ├── ApiError.ts
│   │   └── ApiResponse.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── package.json
├── tsconfig.json
└── .gitignore

🧠 Architecture Explanation (OOP)
Controller Layer

Handles HTTP requests & responses

No business logic

Service Layer

Contains business logic

Performs validation and authorization checks

Repository Layer

Handles all database interactions

Uses Prisma Client only

This separation ensures maintainability, testability, and scalability.

🧬 Database Schema (Prisma)
User

id

name

email (unique)

password (hashed)

contacts (relation)

createdAt

updatedAt

Contact

id

name

phone

email

address

category (personal | work | emergency)

isFavorite

userId (FK)

createdAt

updatedAt

🔗 API Endpoints
Auth Routes
POST /api/auth/register
POST /api/auth/login

Contact Routes (Protected)
POST   /api/contacts
GET    /api/contacts
GET    /api/contacts/:id
PUT    /api/contacts/:id
DELETE /api/contacts/:id

⚙️ Environment Variables

Create a .env file in the root directory:

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret

▶️ How to Run the Project
1️⃣ Install Dependencies
npm install

2️⃣ Setup Prisma
npx prisma generate
npx prisma migrate dev

3️⃣ Run in Development
npm run dev

4️⃣ Build & Run Production
npm run build
npm start

🧪 API Testing

Use Postman or Thunder Client

First register/login to get JWT token

Add token in headers:

Authorization: Bearer <token>

📌 Key Learning Outcomes

Implemented CRUD operations using OOP

Used Prisma ORM with PostgreSQL

Applied repository pattern

Implemented authentication & authorization

Built scalable and maintainable backend structure
