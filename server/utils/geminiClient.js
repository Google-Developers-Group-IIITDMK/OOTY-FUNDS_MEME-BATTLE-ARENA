import axios from "axios";
import dotenv from "dotenv";
import fetch from "node-fetch"

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "models/gemini-2.5-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/${MODEL_NAME}:generateContent`;

/**
 * Download image from URL and convert to base64
 */
async function urlToBase64(imageUrl) {
  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer).toString("base64");
}

/**
 * Generate a funny caption/roast for an image
 * @param {string} imageUrl - Cloudinary (or any) image URL
 */
export const generateCaptionForImage = async (imageUrl) => {
  try {
    const base64Image = await urlToBase64(imageUrl);

    const prompt = "Write ONE short, funny, meme-style roast caption for this image. Reply with only the caption text in a single line, no explanations or options.";

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64Image,
                },
              },
            ],
          },
        ],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const caption =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Couldn’t generate a caption 🤔";

    return caption;
  } catch (error) {
    console.error(
      "Error generating caption:",
      error.response?.data || error.message
    );
    return "⚠️ AI roast machine failed!";
  }
};