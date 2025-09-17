URL Shortener 🚀

A simple and efficient URL Shortener web application built with Node.js, Express, MongoDB, and optionally React for the frontend. Users can create short URLs for long links and track them easily.

Features

Shorten long URLs in a single click.

Redirect to the original URL via the shortened link.

Optional: User authentication for managing links.

MongoDB integration for persistent storage.

RESTful API for frontend or third-party integration.

Easy to deploy on platforms like Vercel (frontend) and Render/Railway (backend).

Tech Stack

Frontend: React, Tailwind CSS (optional)

Backend: Node.js, Express

Database: MongoDB

Authentication: JWT (optional)

Version Control: Git & GitHub

Project Structure
/client        → React frontend (optional)
/server        → Node.js + Express backend
/models        → MongoDB models (URL, User)
/routes        → API routes (auth, URLs)
/controllers   → API logic

Installation

Clone the repository:

git clone https://github.com/<your-username>/url-shortener.git
cd url-shortener


Install backend dependencies:

cd server
npm install


Create a .env file in the server folder:

MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_secret_key>
PORT=5000


Start the backend server:

npm run dev


(Optional) Install frontend dependencies and start React:

cd ../client
npm install
npm start

API Endpoints (Backend)
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and get JWT token
POST	/api/urls	Create a short URL
GET	/api/urls/:shortId	Redirect to original URL
GET	/api/urls	Get all user URLs (optional)
Usage

Visit the frontend URL or use Postman to test the API.

Enter a long URL → Get a short URL.

Open the short URL → Redirects to the original link.

(Optional) Login/Register to manage your links.

Deployment

Frontend: Deploy on Vercel

Backend: Deploy on Render or Railway

Database: Use MongoDB Atlas

License

This project is MIT Licensed – feel free to use and modify it.
