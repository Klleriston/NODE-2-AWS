import express from "express";
import weatherController from "../controllers/weatherController.js";

const routes = express.Router();

routes.get("/weather", weatherController.getOnlyCity);
routes.get("/weather/filter", weatherController.getfiletCity);

export default routes;