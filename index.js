const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const BOT_TOKEN = process.env.HOSTING_BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// Send message function
const sendMessage = async (chatId, text) => {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: text
    });
};

// Webhook handler
app.post('/webhook', async (req, res) => {
    const message = req.body.message;
    if (!message) return res.sendStatus(200);

    const chatId = message.chat.id;
    const text = message.text;

    if (text === '/start') {
        await sendMessage(chatId, 'Welcome to the Bot! Use /upload, /list, or /delete.');
    } else if (text === '/upload') {
        await sendMessage(chatId, 'Send me the file you want to upload.');
    } else if (text === '/list') {
        await sendMessage(chatId, 'Listing your files (feature to be added).');
    } else if (text === '/delete') {
        await sendMessage(chatId, 'Send the filename to delete (feature to be added).');
    } else {
        await sendMessage(chatId, `You said: ${text}`);
    }

    res.sendStatus(200);
});

// Server listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot running on port ${PORT}`));
