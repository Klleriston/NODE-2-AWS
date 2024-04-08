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

    static async getfiletCity(req, res) {
        const { startDate, endDate, city } = req.query;
        try {
            let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.KEY}`
            if (startDate && endDate) {
                url += `&start=${startDate}&end=${endDate}`;
            }
            const response = await axios.get(url);
            const weatherData = response.data.list;

            const weatherList = weatherData.map(item => {
                const temperatureCelsius = (item.main.temp - 273.15).toFixed(2);
                const feelsCelsius = (item.main.feels_like - 273.15).toFixed(2);

                return {
                    date: item.dt_txt,
                    temperature: temperatureCelsius,
                    feels_like: feelsCelsius
                };
            });
            res.status(200).json({
                message: "Success",
                city: {
                    name: city,
                    weather: weatherList
                }
            });          
        } catch (error) {
            res.status(500).json({
                message: `Error :( - ${error.message}`
            });
        }
    }
}

export default WeatherController;