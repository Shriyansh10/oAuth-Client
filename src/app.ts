import express, { Express, Request, Response } from 'express';
import authRouter from './module/auth/auth.route.js';
import cors from 'cors'

const app:Express = express();

app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5500", // Your frontend port
    credentials: true,
  }),
);

app.get('/', (req: Request, res: Response)=>{
    res.json({
        message: 'ok'
    })
})

app.use('/api/auth', authRouter)

export default app;