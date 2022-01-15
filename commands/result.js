module.exports = {
    name: 'result',
    description: 'finish the game day and set results! after give points to player',
    async execute(message, args, prisma) {
        if (message.author.username !== '.keyH') return
        let counter = 0
        let week
        let day
        let match
        for (let x = 0; x < args.length; x++) {
            if (args[x] === 'day') {
                day = args[x + 1]
            }
            if (args[x] === 'week') {
                week = args[x + 1]
            }
            if (args[x] === 'match') {
                match = args[x + 1]
            }
        }
        const team = args.at(-1)

        const teamID = await prisma.team.findFirst({
            where: {
                name: team
            },
            select: {
                uid: true,
                name: false
            }
        })
        day = await parseInt(day)
        week = await parseInt(week)
        match = await parseInt(match)

        const matchID = await prisma.match.findMany({
            where: {
                AND: [
                    {
                        day: {equals: day},
                    },
                    {
                        week: {equals: week}
                    },
                    {
                        match: {equals: match}
                    },
                    {
                        teamID: {equals: await parseInt(teamID.uid)}
                    }

                ]
            }
        })
        console.log(matchID)
        console.log(matchID[0].uid)
        let hasWon = matchID[0].uid

        const winner = await prisma.tip.findMany({
            where: {
                matchID: hasWon
            },
            select: {
                playerID: true
            }
        })

        console.log(winner)
        for (let y = 0; y < winner.length; y++) {
            let playerIDs = await prisma.player.findMany({
                where: {
                    uid: winner[y].playerID
                },
                select: {
                    uid: true,
                    points: true
                }
            })
            console.log(playerIDs[0].points)

            let oldPoints = playerIDs[0].points
            oldPoints++

            await prisma.player.update({
                where: {
                    uid: playerIDs[0].uid
                },
                data: {
                    points: {
                        set: oldPoints
                    }
                }
            })
        }
        message.channel.send('points added')
    },
};