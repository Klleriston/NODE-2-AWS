import weather from "../models/Weather.js"
import axios from "axios";

class WeatherController {
    static async getOnlyCity(req, res) {
        const city = req.query.city;
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.KEY}`);
            const weatherData = response.data;

            const temperatureCelsius = weatherData.main.temp - 273.15;
            const feelsCelsius = weatherData.main.feels_like - 273.15;
            

            const mappedWeather = {
                name: weatherData.name,
                weather: {
                    temperature: temperatureCelsius.toFixed(),
                    feels_like: feelsCelsius.toFixed(),
                }
            };
            res.status(200).json(
                {
                    message: "Sucess",
                    city: mappedWeather
                }
            );
        } catch (error) {
            res.status(500).json({
                message: `Error :( - ${error.message}`
            });
        }
    };
}

export default WeatherController;