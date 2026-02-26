import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db';
import authRoutes from './modules/auth/auth.routes';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Global Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
// Basic Health Check Route (Checks Express AND Postgres)
app.get('/health', async (req: Request, res: Response) => {
  try {
    const dbRes = await pool.query('SELECT NOW()');
    res.status(200).json({
      status: 'UP',
      message: 'APMS Server is running',
      database_time: dbRes.rows[0].now
    });
  } catch (error) {
    res.status(500).json({
      status: 'DOWN',
      error: 'Database connection failed'
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 APMS Server running on http://localhost:${PORT}`);
});