# 🔗 URL Shortener & Analytics Platform

URL Shortener & Analytics is a full-stack web application that allows users to convert long URLs into short, easy-to-share links while tracking detailed analytics about their links.

It provides an efficient way to **create, manage, share, and monitor shortened URLs** from a single platform.

---

## 💡 Problem Statement

Long URLs can be difficult to share, remember, and manage. Additionally, users often do not know how their shared links are performing, such as how many people clicked them.

**URL Shortener & Analytics solves this problem** by converting long URLs into short links and providing analytics to help users monitor link performance.

---

## ✨ Key Features

* 🔗 **Shorten Long URLs** into simple and unique links
* ⚡ **Fast Redirection** to the original URL
* 🎲 **Unique Short Code Generation**
* 📊 **URL Analytics and Click Tracking**
* 📈 **Track Link Performance**
* 👆 **Monitor Total Clicks**
* 📋 **Easy Link Sharing and Copying**
* 🔐 **Secure User Authentication**
* 🗂️ **Manage Created URLs**
* 📱 **Responsive User Interface**

---

## 📊 Analytics

The platform provides analytics for shortened URLs, helping users understand how their links are being used.

Users can monitor:

* 📈 Total number of clicks
* 🔗 Performance of individual shortened URLs
* 📊 Link usage and engagement
* 📅 Click activity over time

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* TanStack Query

### Backend

* Node.js
* Express.js

### Database

* MongoDB

---

## ⚙️ How It Works

1. Users securely sign up or log in to the platform.
2. Users enter a long URL they want to shorten.
3. The application validates the original URL.
4. A unique short code is generated.
5. The original URL and short code are stored in the database.
6. A shortened URL is generated and displayed to the user.
7. When someone visits the shortened URL, they are redirected to the original destination.
8. Each visit is tracked and stored for analytics.
9. Users can view the performance and click analytics of their shortened URLs.

---

## ▶️ Run Locally

### Clone the Repository

```bash
git clone https://github.com/irfan-ansari303/url-shortner.git
cd url-shortner
```

### Setup and Run Backend

```bash
cd backend
npm install
npm run dev
```

### Setup and Run Frontend

Open a new terminal and run:

```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Structure

```text
url-shortner/
├── frontend/          # React.js frontend application
├── backend/           # Node.js and Express.js backend
├── README.md
└── .gitignore
```

---

## 🎯 Project Objective

The objective of **URL Shortener & Analytics** is to provide a simple and efficient platform where users can shorten long URLs and gain valuable insights into their link performance through analytics and click tracking.

**🔗 Shorten • 📤 Share • 📊 Track • 📈 Analyze**

---

## 👨‍💻 Author

**Irfan Ansari**
Full Stack Developer

⭐ If you like this project, consider giving it a star!
