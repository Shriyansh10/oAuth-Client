import http from "node:http";
import app from "./app.js";
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres';

async function main() {
  try {
    const port = process.env.PORT || 5000;
    const server = http.createServer(app);
    const db = drizzle(process.env.DATABASE_URL!);
    console.log(db)
    server.listen(port , () => {
      console.log(
        `Server is running at Port ${process.env.PORT || 5000} in ${process.env.NODE_ENV} mode`,
      );
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
