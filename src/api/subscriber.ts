import { VercelRequest, VercelResponse } from '@vercel/node';

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = "UCZYQ9SOiYqJ4NgZva3M8GAg"; // Replace with your channel ID

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
    );
    console.error(response);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subscriber count" });
  }
}