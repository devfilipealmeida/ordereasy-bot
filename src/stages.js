const { storage } = require('./storage');
const { initialStage } = require('./stages/index')

const stages = [
    {
        descricao: 'Welcome',
        stage: initialStage
    },
];

function getStage({ from }) {
    if (storage[from]) {
        return storage[from].stage;
    }
    storage[from] = {
        stage: 0,
        itens: [],
        previous: 0,
    };

    return storage[from].stage;
}

module.exports = { stages, getStage }