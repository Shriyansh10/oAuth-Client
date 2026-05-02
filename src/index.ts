import http from "node:http";
import app from "./app.js";
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres';
import fetchOidcConfiguration from "./common/config/oidc-config.js";

async function main() {
  try {
    const port = process.env.PORT || 3000;
    const server = http.createServer(app);
    await fetchOidcConfiguration();
    const db = drizzle(process.env.DATABASE_URL!);
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
