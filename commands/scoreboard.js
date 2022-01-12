const {stringify, repl} = require("yarn/lib/cli");
const Console = require("console");
module.exports = {
    name: 'scoreboard',
    description: 'Show all competitors and their current points',
    async execute(message, args, prisma) {
        let scoreboard = await prisma.player.findMany({
            orderBy:[
                {
                    'points': 'desc'
                }
            ]
        })
        let count = await prisma.player.count()
        let reply = ``
        for (let x = 0; x < count; x++) {
           reply += `${scoreboard[x].name}: ${scoreboard[x].points} points\n`
        }
        message.channel.send(reply)
    }

}