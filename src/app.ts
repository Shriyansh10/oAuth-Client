import express, { Express, Request, Response } from 'express';

const app:Express = express();

app.use(express.json())

app.get('/', (req: Request, res: Response)=>{
    res.json({
        message: 'ok'
    })
})



export default app;