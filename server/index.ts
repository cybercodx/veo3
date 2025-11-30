import { Hono } from 'hono';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { cors } from 'hono/cors';

type Bindings = {
  GEMINI_API_KEY: string;
}

const app = new Hono<{ Bindings: Bindings }>();

app.use('/api/*', cors());

app.post('/api/generate-prompt', async (c) => {
  const { prompt } = await c.req.json();

  const genAI = new GoogleGenerativeAI(c.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const generationPrompt = `Generate a detailed, professional, and comprehensive Google Veo prompt based on the following description. The output should be a JSON object with the following structure:
  {
    "subject": "A clear and concise description of the main subject of the video.",
    "context": "The background or environment where the scene takes place.",
    "action": "A description of what the subject is doing.",
    "style": "The visual style of the video (e.g., cinematic, animated, stop-motion).",
    "camera_motion": "The movement of the camera (e.g., aerial shot, eye-level, top-down).",
    "composition": "How the shot is framed (e.g., wide shot, close-up).",
    "ambiance": "The mood and lighting of the scene (e.g., warm tones, blue light, nighttime).",
    "audio": "A description of the audio, including dialogue, sound effects, and music."
  }
  
  Description: ${prompt}
  `;

  const result = await model.generateContent(generationPrompt);
  const response = await result.response;
  const text = await response.text();

  return c.json({ generatedPrompt: text });
});

export default app;
