// src/api/memeApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER || "http://localhost:3000"; 

const api = axios.create({
  baseURL: API_URL,
  timeout: 12000,
});

// Upload meme ye multipart/form-data hai
export const uploadMeme = (formData, token) => {
  return api.post("/api/meme/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

//ye simple json hai 
export const voteMeme = (voteData, token) => {
  return api.post("/api/meme/vote", voteData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
