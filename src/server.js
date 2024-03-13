const { Client, LocalAuth, MessageMedia, List } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express()

const { stages, getStage } = require('./stages')

const client = new Client({
    authStrategy: new LocalAuth({ cliientId: 'rrtv' }),
    puppeteer: {
        headless: true,
        //executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- this one doesn't works in Windows
            '--disable-gpu'
        ]
    }
})

client.initialize()

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    if (msg.type.toLowerCase() == "e2e_notification") return null;
    if (msg.body === "") return null;

    const currentStage = getStage({ from: msg.from })

    const messageResponse = stages[currentStage].stage.exec({
        from: msg.from,
        message: msg.body,
        type: msg.type
    });

    if (messageResponse) {
        client.sendMessage(msg.from, messageResponse)
    }
})

app.listen(process.env.PORT || 3000)