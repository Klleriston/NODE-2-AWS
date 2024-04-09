import express from "express";
import ct from "./infra/database.js";
import routes from "./routes/index.js";

const PORT = process.env.PORT || 3000;
const connection = await ct();

const app = express();
routes(app);

export default app;