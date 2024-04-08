import express from "express";
import  weathers from "./weatherRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Crawler"));
    app.use(express.json(), weathers);
};

export default routes;