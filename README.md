# 🏆 OOTY-FUNDS_MEME-BATTLE-ARENA

A real-time meme battle platform built with **Node.js, Express, and MongoDB**, featuring AI-generated captions, voting, and dynamic leaderboards. Users can upload memes, vote in battles, and track top performers in real-time using **Socket.IO**.

---

## 📸 Demo Images

> **NOTE:** Replace these placeholders with actual screenshots from your running application!

![Home Page](https://drive.google.com/file/d/1ubA4sKJtJyVZZ6vMNfYJGlfgOCDqzJBx/view?usp=sharing/800x400.png?text=Home+Page)  
![Home Page](https://drive.google.com/file/d/1Sq4VA3GFppRtf5BPTwNDvXljy0lbfTa5/view?usp=sharing/800x400.png?text=Leaderboard)  
![Battle Arena](https://drive.google.com/file/d/18oiU8IxzAdQSQ90kvdX9TCLj_lOBNAI2/view?usp=sharing/800x400.png?text=Battle+Arena)  

---

## ✨ Features

- **Real-time Meme Battles** with Socket.IO 🌐  
- **AI-Generated Captions** for memes (via OpenAI or custom AI) 🤖  
- **Voting System** to determine winners in battle rooms 🗳️  
- **Dynamic Leaderboards** for top users and meme creators 📊  
- **JWT Authentication** for secure login/signup 🔐  
- **Responsive Design** for web and mobile access 📱  

---

## 🏗️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js (or any client consuming APIs) | User Interface and interaction |
| **Backend** | Node.js, Express.js | API server and business logic |
| **Database** | MongoDB | Storing users, memes, and battle data |
| **Real-Time** | Socket.IO | Instant battle updates, voting, and notifications |
| **Auth** | JWT | Secure user authentication and authorization |
| **AI** | Gemini | Generating creative meme captions |

---

## 📊 System Flow Diagram

```mermaid
graph TD
    User[User] -->|Uploads Meme| Backend[Server]
    Backend --> AI[AI Caption Generator]
    AI --> Battle[Battle Arena]
    Battle --> Users[Other Users]
    Users -->|Vote| Battle
    Battle --> Leaderboard[Leaderboard]
    Leaderboard --> User
