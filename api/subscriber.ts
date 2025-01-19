import { VercelRequest, VercelResponse } from '@vercel/node';


export default async function handler(req: VercelRequest, res: VercelResponse) {

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = "UCZYQ9SOiYqJ4NgZva3M8GAg";
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
    );    
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch subscriber count" });
  }
}