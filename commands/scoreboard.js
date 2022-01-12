const {stringify} = require("yarn/lib/cli");
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
        Console.log(JSON.stringify(scoreboard))
    }

}