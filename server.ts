import express from 'express';
import cors from 'cors';
import payload from 'payload';
import { config } from 'dotenv';

config();

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Add body parser middleware before Payload initialization
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Redirect root to admin
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-this',
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Payload server running on port ${PORT}`);
  });
};

start();

