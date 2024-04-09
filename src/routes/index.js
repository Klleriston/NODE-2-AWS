import express from "express";
import weatherRoutes from "./weatherRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Crawler"));
    app.use(express.json(), weatherRoutes);
};

export default routes;