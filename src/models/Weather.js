import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema(
    {
        id: {type: mongoose.Schema.Types.ObjectId},
        name: {type: String, required: true},
        weather: {type: Object, required: true},
    }, {versionKey: false}
);

const Weather = mongoose.model("Weather", weatherSchema);

export default Weather;