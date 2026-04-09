# 🛒 SRBH-Commerce

A full-stack **E-commerce Web Application** built using **Django REST Framework** (backend) and **React (Vite)** (frontend). This project demonstrates real-world features like authentication, cart management, and order processing.

---

## 🚀 Features

### 🔐 Authentication

* User Signup & Login
* JWT Authentication (Access & Refresh Token)
* Protected Routes using PrivateRoute

### 🛍️ Product Module

* View all products
* View product details
* Category-based structure

### 🛒 Cart System

* Add to cart
* Remove from cart
* Update quantity
* Auto total calculation

### 📦 Order System

* Checkout form
* Create order from cart
* Store order items
* Clear cart after order

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* React Router DOM
* Context API
* Tailwind CSS

### Backend

* Django
* Django REST Framework (DRF)
* Simple JWT

### Database

* MySQL

---

## 📁 Project Structure

```
frontend/
│
├── components/
│   └── Navbar.jsx
│
├── pages/
│   ├── ProductList.jsx
│   ├── ProductDetails.jsx
│   ├── CartPage.jsx
│   ├── CheckOutPage.jsx
│   ├── Login.jsx
│   └── Signup.jsx
│
├── context/
│   └── CartContext.jsx
│
├── utils/
│   └── auth.js
│
└── App.jsx


backend/
│
├── store/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
└── settings.py
```

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate environment
# Windows:
venv\Scripts\activate

# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start server
python manage.py runserver
```

---

### 💻 Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

---

## 🔐 Environment Variables

Create `.env` file in frontend:

```
VITE_DJANGO_BASE_URL=http://127.0.0.1:8000
```

---

## 🔌 API Endpoints

### 🔑 Authentication

* POST `/api/register/` → Register user
* POST `/api/token/` → Login (JWT)
* POST `/api/token/refresh/` → Refresh token

### 🛍️ Products

* GET `/api/products/`
* GET `/api/products/:id/`

### 🛒 Cart

* GET `/api/cart/`
* POST `/api/cart/add/`
* POST `/api/cart/remove/`
* POST `/api/cart/update/`

### 📦 Orders

* POST `/api/orders/create/`

---

## 🔄 Application Flow

1. User Signup/Login → JWT token stored in localStorage
2. User adds products → Saved in cart
3. Cart fetched using API
4. Checkout → Order created
5. Cart cleared after order

---

## ⚠️ Known Issues

* Logout does not remove access token properly
* No payment gateway integration
* No order history page
* No product search/filter

---

## 🛠️ Future Improvements

* Payment Integration (Razorpay / Stripe)
* Order History Page
* Admin Dashboard
* Product Search & Filters
* Better UI/UX

---

## 👨‍💻 Author

**Saurabh Kumar**
Backend Developer (Python | Flask | Django)

---

## ⭐ Project Summary (For Interview)

> I built a full-stack e-commerce application using Django REST Framework and React. It includes JWT authentication, cart management, and order processing. I also implemented protected routes and used Context API for real-time cart updates.

---
