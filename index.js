import "dotenv/config";
import app from "./src/app.js";

app.listen(process.env.PORT, () => {
    console.log(`Listen on http://localhost:${process.env.PORT}`);
});

export const handler = async (event, context) => {
    return app(event, context);
};