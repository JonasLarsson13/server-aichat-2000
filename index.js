import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import env from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
env.config();

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
    organization: process.env.OPEN_ORG_ID,
    apiKey: process.env.OPEN_API_KEY
});
const openai = new OpenAIApi(configuration);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.post("/", async (req, res) => {
    const { message } = req.body;
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 300,
            temperature: .5
        });
        res.json({ message: response.data.choices[0].text });
    } catch (error) {
        console.log(error);
        res.send(error).status(400);
    }
});
