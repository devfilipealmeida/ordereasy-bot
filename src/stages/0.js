const { Buttons } = require('whatsapp-web.js')

const { storage } = require('./../storage')

const initialStage = {
    exec({ from }) {
        storage[from].stage = 1;
        const msg_initial = 'Olá, Seja Bem Vindo :) \nSou o bot de atendimento da Noah Pizzaria! \nDigite abaixo a opção que deseja: \n1️⃣ Cardápio \n2️⃣ Nossos Horários \n3️⃣ Taxas de Entrega \n4️⃣ Acompanhar Pedido'

        return msg_initial

    },
};

module.exports = { initialStage }
