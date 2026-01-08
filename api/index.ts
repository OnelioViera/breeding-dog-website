import express from 'express';
import cors from 'cors';
import payload from 'payload';
import type { Request, Response } from 'express';

const app = express();

// Enable CORS
const frontendUrl = process.env.FRONTEND_URL || process.env.VERCEL_URL || '*';
app.use(cors({
  origin: frontendUrl === '*' ? true : frontendUrl,
  credentials: true,
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize Payload
let payloadInitialized = false;
let initPromise: Promise<void> | null = null;

const initPayload = async () => {
  if (payloadInitialized) {
    return;
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      await payload.init({
        secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-this',
        express: app,
        onInit: async () => {
          payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
          payloadInitialized = true;
        },
      });
    } catch (error) {
      console.error('Error initializing Payload:', error);
      payloadInitialized = false;
      initPromise = null;
      throw error;
    }
  })();

  return initPromise;
};

// Vercel serverless function handler
export default async function handler(req: Request, res: Response) {
  try {
    // Initialize Payload if not already done
    await initPayload();
    
    // Handle the request with Express app
    app(req, res);
  } catch (error) {
    console.error('Error in serverless function:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

