import 'dotenv/config';
import { createServer } from 'http';
import app from './app.js';


const port = Number(process.env.PORT || 3000);
const server = createServer(app);


server.listen(port, () => console.log(`API listening on :${port}`));

// server.listen(port, () => logger.info({ port }, `API listening on :${port}`));


