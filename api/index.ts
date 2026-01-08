import express from 'express';
import cors from 'cors';
import payload from 'payload';
import path from 'path';
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
      console.log('=== Payload Initialization ===');
      console.log('DATABASE_URI:', process.env.DATABASE_URI ? `Set (${process.env.DATABASE_URI.substring(0, 30)}...)` : 'MISSING');
      console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? 'Set' : 'MISSING');
      console.log('PAYLOAD_PUBLIC_SERVER_URL:', process.env.PAYLOAD_PUBLIC_SERVER_URL || 'Not set');
      console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'Not set');
      console.log('VERCEL_URL:', process.env.VERCEL_URL || 'Not set');
      
      if (!process.env.DATABASE_URI) {
        throw new Error('DATABASE_URI environment variable is not set!');
      }
      
      if (!process.env.PAYLOAD_SECRET) {
        throw new Error('PAYLOAD_SECRET environment variable is not set!');
      }
      
      // Log working directory and check for config file
      const cwd = process.cwd();
      console.log('Current working directory:', cwd);
      
      // In Vercel, files are in /vercel/path0, but we need to ensure config is accessible
      // Payload looks for payload.config.ts in the current working directory
      // We'll let Payload auto-detect, but ensure the path is correct
      
      await payload.init({
        secret: process.env.PAYLOAD_SECRET,
        express: app,
        onInit: async () => {
          payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
          payload.logger.info(`Database URI configured: ${process.env.DATABASE_URI ? 'Yes' : 'No'}`);
          payloadInitialized = true;
        },
      });
      
      console.log('Payload initialized successfully');
    } catch (error: any) {
      console.error('=== Payload Initialization Error ===');
      console.error('Error message:', error?.message);
      console.error('Error stack:', error?.stack);
      if (error?.name === 'MongoServerError' || error?.message?.includes('Mongo')) {
        console.error('MongoDB connection error detected');
        console.error('Check: 1) DATABASE_URI is correct, 2) MongoDB Atlas Network Access allows Vercel IPs');
      }
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

