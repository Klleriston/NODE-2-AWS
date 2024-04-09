import Weather from "../models/Weather.js"
import AWS from 'aws-sdk';
import axios from "axios";

class WeatherController {
    static async getOnlyCity(req, res) {
        const {city} = req.query;
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

    static async postWeather(event) {
        try {
            const city = "London";

            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.KEY}`);
            const weatherData = response.data;
            const temperatureCelsius = (weatherData.main.temp - 273.15).toFixed(2);
            const feelsCelsius = (weatherData.main.feels_like - 273.15).toFixed(2);

            const newWeather = new Weather({
                name: weatherData.name,
                weather: {
                    temperature: temperatureCelsius,
                    feels_like: feelsCelsius,
                }
            });

            const lambda = new AWS.Lambda();
            const params = {
                FunctionName: 'crawler',
                Payload: JSON.stringify({ city })
            };
            
            const lambdaResponse = await lambda.invoke(params).promise();
            const lambdaData = JSON.parse(lambdaResponse.Payload);
            await newWeather.save();
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Success",
                    city: lambdaData.city
                })
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: `Error :( - ${error.message}`
                })
            };
        }
    }
};

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

export const handler = async (event) => {
    return await WeatherController.postWeather(event);
};

export default WeatherController;