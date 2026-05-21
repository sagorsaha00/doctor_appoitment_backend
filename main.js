import express from 'express';
import cors from 'cors';
import { run } from './src/services/db.js';
import router from './src/router/index.js';

const app = express();
const PORT = 3001;
app.use(cors({
    origin: 'http://localhost:3000, https://doctor-appoinment-client-server.vercel.app',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))


app.use(express.json());
app.use('/', router)

const startServer = async () => {
    try {
        await run();
    } catch (error) {
        console.error(error);
    }
};

app.listen(PORT, () => {
    startServer();
    console.log(`Server listening on port ${PORT}`);
});

export default app;