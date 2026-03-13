# Vendor Management System

A full-stack Vendor Management System built using **Django REST Framework** for the backend and **Next.js (React)** for the frontend.

This application allows vendors to authenticate and manage their products through a secure dashboard.

---

## Features

* Vendor Registration & Login
* Token-based Authentication
* Add Products
* Update Products
* Delete Products
* View Product List
* Vendor Dashboard UI

---

## Tech Stack

### Backend

* Python
* Django
* Django REST Framework

### Frontend

* Next.js
* React
* JavaScript
* Fetch API

---

## Project Structure

vendor-management-system

backend/

* Django project
* API endpoints
* Product & Vendor models

frontend/

* Next.js application
* Vendor dashboard
* Product management UI

README.md

---

## API Endpoints

### Authentication

POST /api/login/

### Products

Get all products
GET /api/products/

Add product
POST /api/products/add/

Update product
PUT /api/products/{id}/

Delete product
DELETE /api/products/{id}/

---

## Installation

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

## How It Works

1. Vendor logs in using credentials.
2. Authentication token is generated.
3. Token is stored in the frontend.
4. Vendor can manage products from the dashboard.

---

## Author

Veena


