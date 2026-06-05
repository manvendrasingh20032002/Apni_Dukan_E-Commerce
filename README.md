# 🛍️ Apni Dukan - MERN Stack E-Commerce Application

Apni Dukan is a modern, responsive, and full-stack e-commerce web application built using the MERN stack (MongoDB, Express, React, Node.js), Redux Saga, and Bootstrap.

---

## ✨ Features

- **Full-featured Shop:** Product browsing, category filtering, search, and detail pages.
- **State Management:** Fully structured Redux state with Redux Sagas for async side-effects (API requests).
- **User Authentication:** Secure JWT-based user register, login, and profile dashboard.
- **Admin Control Panel:** Dashboard for administrators to manage products, categories, orders, newsletter subscriptions, and users.
- **Online Payments:** Integrated with Razorpay payment gateway (in test mode).
- **Monolith Deployment Friendly:** Express serves the built static frontend assets directly, ensuring zero CORS issues and simple deployment.

---

## 🛠️ Tech Stack

- **Frontend:** React, Redux (Sagas), React Router, Bootstrap 5, Vite
- **Backend:** Node.js, Express, Mongoose (MongoDB)
- **Email Dispatch:** Nodemailer
- **Payments:** Razorpay

---

## 🚀 Structure

- `apni dukan/` - The React frontend code.
- `server/` - The Express backend server, which also serves the compiled React app statically from `server/dist`.

---

## 💻 Local Development Setup

### 1. Backend Server Setup
```bash
cd server
npm install
npm run dev
```
Starts the server at [http://localhost:8000](http://localhost:8000).

### 2. Frontend Setup
```bash
cd "apni dukan"
npm install
npm run dev
```
Starts the frontend client at [http://localhost:5173](http://localhost:5173).

---

*Created for educational purposes and portfolio showcase.*
