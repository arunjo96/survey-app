# 📊 Survey / Feedback Application

A full-stack Survey & Feedback Application built as part of a Full Stack Developer Intern task.
The application allows users to create surveys, submit responses, and view survey results.

## 🚀 Features

### 🔐 Authentication
- User Registration & Login
- JWT-based authentication
- Protected routes for survey actions

### 📝 Survey Management
- Create surveys with:
  - Text questions
  - Multiple-choice questions (MCQ)
- Add / remove questions dynamically
- Edit & delete surveys

### 📥 Survey Responses
- Users can fill out surveys
- Supports text & MCQ answers
- Responses stored securely in database

### 📊 Analytics Dashboard
- View total number of responses
- Survey results displayed using Chart.js
- Horizontal bar charts for easy understanding

### ⚡ Real-Time Updates (Socket.io)
- Live survey list updates
- Real-time response count & chart updates
- No page refresh required

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Chart.js (react-chartjs-2)
- Socket.io Client
- Axios

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Socket.io

### Database
- MongoDB

## 📂 Project Structure

```
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── utils
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── api
│   │   ├── utils
│   │   └── App.jsx

```


## ⚙️ Installation & Setup

 Clone the repo
   ```bash
   git clone https://github.com/arunjo96/survey-app.git
   
```


