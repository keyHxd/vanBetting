import prisma from '../src/client'

module.exports = {
    name: 'addPlayer',
    description: 'add player to the competition!',
    execute(message, args) {
        message.channel.send(`${args}`)
    },
};