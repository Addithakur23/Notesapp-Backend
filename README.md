# Notes App – Backend

This is the backend of the Notes Application built using Node.js and Express.  
It provides secure REST APIs for authentication and note management.

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT (Authentication)
- bcrypt (Password Hashing)
- CORS
- dotenv

## 🌐 Deployed API

https://notesapp-backend-asli.onrender.com

## ⚙️ Installation (Local Setup)

1. Clone the repository:

git clone https://github.com/Addithakur23/Notesapp-Frontend.git


2. Navigate to backend folder:

cd backend


3. Install dependencies:

npm install


4. Create a `.env` file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000


5. Start server:

npm run dev


## 🔐 Features

- User Signup & Login
- Password Hashing (bcrypt)
- JWT Authentication
- Role-Based Authorization (Admin & User)
- Protected Routes
- CRUD Operations for Notes
- Admin-only routes

## 📌 API Endpoints

### Auth
- POST /api/signup
- POST /api/login

### Notes
- GET /api/notes
- POST /api/notes
- PUT /api/notes/:id
- DELETE /api/notes/:id

### Admin
- GET /api/users

## 🛡 Security

- Passwords are hashed using bcrypt
- JWT used for secure authentication
- Role-based access middleware implemented
- CORS configured for production

## 👨‍💻 Author

Aditya
