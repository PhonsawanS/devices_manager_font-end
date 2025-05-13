# Device Manager

**Device Manager** is a system that allows users to manage device data with core features such as **user registration**, **login**, and **device management**. Devices can be added manually or imported from a CSV file.

---

## 🔗 Live Demo

👉 Try it here: [https://devices-manager-font-end.vercel.app/](https://devices-manager-font-end.vercel.app/)

Use the demo account below to explore the features.

---

## 🔐 Demo Account

You can use the following credentials to test the system:

- **Username**: `user`  
- **Password**: `user12345678`

---

## 🔧 Features

### 1. **User Registration**
- Users can create a new account with the following rules:
  - **Username** must be unique (no duplicates allowed)
  - **Password** must be at least 8 characters long
- Passwords are **hashed using Bcrypt** before being stored in the database

### 2. **User Login**
- After successful login, users will receive a **JWT Token**
- This token is required to access the device management page and protected API endpoints

### 3. **Device Management**
- Accessible only after logging in
- Devices can be added in two ways:
  - Manually via a form
  - Imported from a **CSV file**

---

## ⚙️ Project Setup

### 1. Install dependencies

```bash
npm install
