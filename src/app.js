import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
// import { notFound, errorHandler } from './middlewares/error.js';

const app = express();
// AFTER:
const corsOptions = {
  // IMPORTANT: Replace this with your frontend's actual origin
  origin: 'http://localhost:5173', 
  credentials: true, // Allow cookies and authorization headers
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (_req, res) => res.json({ "message":"Welcome to WorkEasy A" }));

app.get('/health', (_req, res) => res.json({ "message":"sab changa si" }));

app.use('/api', routes);   // mount all feature routers here

// app.use(notFound);         // 404 handler
// app.use(errorHandler);     // centralized error handler

export default app;
