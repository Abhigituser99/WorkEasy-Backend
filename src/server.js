import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());

//test commit from office laptop

app.get('/health', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'dev' }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
