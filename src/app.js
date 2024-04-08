import express from "express";
import ct from "./infra/database.js";

const c = await ct();

c.on("err", (e) => {
    console.error(e);
});
c.once("open", () => {
});

const app = express();


export default app;