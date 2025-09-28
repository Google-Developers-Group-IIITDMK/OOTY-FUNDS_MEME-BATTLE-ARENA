import express from "express"
import { connectDB } from "./config/db.js"

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const MONGO_URI = 'mongodb://127.0.0.1:27017/meme-battle';

connectDB(MONGO_URI).then(() => {
    server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
});