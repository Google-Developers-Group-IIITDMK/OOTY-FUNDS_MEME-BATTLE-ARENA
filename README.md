# 🏆 OOTY-FUNDS_MEME-BATTLE-ARENA

A real-time meme battle platform built with **Node.js, Express, and MongoDB**, featuring AI-generated captions, voting, and dynamic leaderboards. Users can upload memes, vote in battles, and track top performers in real-time using **Socket.IO**.

---

## 📸 Demo Images

> **NOTE:** Replace these placeholders with actual screenshots from your running application!

![Home Page](https://via.placeholder.com/800x400.png?text=Home+Page)
![Battle Arena](https://via.placeholder.com/800x400.png?text=Battle+Arena)
![Leaderboard](https://via.placeholder.com/800x400.png?text=Leaderboard)

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
| **AI** | OpenAI or custom AI | Generating creative meme captions |

---

## 📊 Flow Diagram

The complete system flow, from meme upload to final leaderboard update.

```mermaid
graph TD
    User[User] -->|Uploads Meme| Backend[Server]
    Backend --> AI[AI Caption Generator]
    AI --> Battle[Battle Arena]
    Battle --> Users[Other Users]
    Users -->|Vote| Battle
    Battle --> Leaderboard[Leaderboard]
    Leaderboard --> User

     Real-Time Features
Battle rooms update in real-time as users vote. Socket.IO emits key events that ensure an instant experience:

new-meme: A new meme is added to the current battle.

vote-update: The vote count for a meme is updated instantly.

battle-winner: The winner of a battle room is announced.
Users see instant leaderboard changes and battle progress across all connected clients.

⚡ API Endpoints
The core REST endpoints for interacting with the battle arena.

Endpoint	Method	Description
/api/auth/signup	POST	Create a new user
/api/auth/login	POST	Login and receive JWT
/api/meme/upload	POST	Upload a meme for battle
/api/meme/battle/:roomId	GET	Fetch memes in a specific battle room
/api/meme/vote	POST	Vote for a meme in a battle
/api/leaderboard	GET	Fetch top users and scores

Export to Sheets
Note: Remember to include appropriate Authentication Headers (Bearer <token>) for protected routes.

🛠️ Installation & Setup
1. Clone the repository
Bash

git clone [https://github.com/Google-Developers-Group-IIITDMK/OOTY-FUNDS_MEME-BATTLE-ARENA.git](https://github.com/Google-Developers-Group-IIITDMK/OOTY-FUNDS_MEME-BATTLE-ARENA.git)
cd OOTY-FUNDS_MEME-BATTLE-ARENA
2. Install dependencies
Bash

npm install
3. Configure environment variables
Create a file named .env in the root directory and add the following configuration.

Code snippet

PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/meme-battle
JWT_SECRET=your_secret_key
# OPENAI_API_KEY=your_openai_key_here (Uncomment and replace if using OpenAI)
4. Run the server
Bash

npm run dev
The server will be running at http://localhost:3000.

📝 Contribution
We welcome contributions! Please follow these steps to get started:

Fork the repository.

Create your feature branch: git checkout -b feature/YourFeature

Commit your changes: git commit -m "Add some feature"

Push to the branch: git push origin feature/YourFeature

Open a Pull Request.

📜 License
This project is licensed under the MIT License.

© 2025 - Your Name (or Google Developers Group IIITDMK)