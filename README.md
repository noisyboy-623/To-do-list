https://to-do-list-omdn.onrender.com

# 📝 To-Do List Web App

A clean and responsive To-Do List application built using **Node.js**, **Express.js**, **MongoDB**, and **EJS templating**. Users can add, edit, prioritize, and delete tasks — all powered by RESTful HTTP methods (`POST`, `PUT`, `DELETE`).

---

## 🚀 Features

- ✅ Add tasks with optional **priority levels** (Low, Medium, High)
- 📝 Edit tasks inline with live form
- 🗑️ Delete tasks using proper HTTP `DELETE` requests
- ⚠️ Form validation with user-friendly error messages
- 💾 MongoDB database integration with **Mongoose**
- 🌐 RESTful routes with **method-override** support
- 🎨 Styled UI with dark theme for better readability

---

## 🧰 Tech Stack

| Layer        | Technology        |
|--------------|------------------|
| Frontend     | EJS, HTML5, CSS3 |
| Backend      | Node.js, Express |
| Database     | MongoDB + Mongoose |
| Utilities    | body-parser, method-override |

---

## 📦 Installation

1. **Clone the repo:**

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app

2. **Install dependencies:**

```bash

npm install

3. **Update your MongoDB URI in server.js:**

mongoose.connect('your_mongodb_uri', {...});

4. **Run the app:**

```bash

node app.js

## 📂 Project Structure

todo-app/
├── views/
│   └── list.ejs           # Main template
├── public/
│   └── css/
│       └── style.css      # Dark theme stylesheet
├── server.js              # Express application
├── package.json
└── README.md

## 🧑‍💻 Author

**Tejas H Shekhar**