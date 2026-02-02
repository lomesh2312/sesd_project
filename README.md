Contact Management System (Backend)

This is a backend CRUD application built using Node.js, Express, PostgreSQL, Prisma ORM, and TypeScript.
The project follows Object-Oriented Programming (OOP) principles and a clean layered architecture.

This project is created as part of the SESD Workshop Assignment.

Features

User registration and login

JWT-based authentication

Create, read, update, and delete contacts

Search contacts by name, phone, or email

Filter contacts by category and favorite status

Sort contacts by name or creation date

Pagination support

Clean error handling

Validation using express-validator

Proper OOP structure (Controller, Service, Repository)

Tech Stack

Node.js

Express.js

TypeScript

PostgreSQL

Prisma ORM

JWT

bcrypt

express-validator

Project Structure

src/
controllers/
AuthController.ts
ContactController.ts

services/
AuthService.ts
ContactService.ts

repositories/
BaseRepository.ts
UserRepository.ts
ContactRepository.ts

routes/
authRoutes.ts
contactRoutes.ts

middlewares/
authMiddleware.ts
errorMiddleware.ts

utils/
ApiError.ts
ApiResponse.ts

app.ts
server.ts

prisma/
schema.prisma

Architecture Overview

Controller Layer
Handles HTTP requests and responses only.

Service Layer
Contains business logic, validation, and authorization.

Repository Layer
Handles all database operations using Prisma ORM.

Database Models

User

id

name

email (unique)

password (hashed)

createdAt

updatedAt

Contact

id

name

phone

email

address

category

isFavorite

userId (foreign key)

createdAt

updatedAt

API Endpoints

Authentication

POST /api/auth/register
POST /api/auth/login

Contacts (Protected Routes)

POST /api/contacts
GET /api/contacts
GET /api/contacts/:id
PUT /api/contacts/:id
DELETE /api/contacts/:id

Environment Variables

Create a .env file in the root directory.

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret

How to Run the Project

Install dependencies
npm install

Generate Prisma client and run migrations
npx prisma generate
npx prisma migrate dev

Run the project in development
npm run dev

Build and run for production
npm run build
npm start

API Testing

Use Postman or Thunder Client.

After login, add the JWT token to request headers.

Authorization: Bearer <token>

Learning Outcomes

Implemented CRUD operations using OOP

Used Prisma ORM with PostgreSQL

Applied repository pattern

Implemented authentication and authorization

Built a scalable backend architecture
