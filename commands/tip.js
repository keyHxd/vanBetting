module.exports = {
    name: 'tip',
    description: 'tip a match of the current week',
    async execute(message, args, prisma) {
        let counter = 0
        let week
        let day
        let match
        for (let x=0; x < args.length; x++) {

           if(args[x] === 'day' ) {
               day = args[x + 1]
           }
            if(args[x] === 'week' ) {
                week = args[x + 1]
            }
            if(args[x] === 'match' ) {
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

        try {
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
                        },
                        {
                            winner: {equals: false}
                        }

                    ]
                }
            })
            await console.log(matchID)

            if (matchID.length > 0) {

                const playerID = await prisma.player.findMany({
                    where: {
                        name: message.author.username
                    },
                    select: {
                        uid: true,
                        name: false,
                        points: false
                    }
                })
                console.log(playerID)

                const findBet = await prisma.tip.findFirst({
                    where: {
                        matchID: {equals: matchID[0].uid},
                        playerID: {equals: playerID[0].uid}
                    }
                })
                console.log(findBet)

                if (findBet <= 0) {
                    const newBet = await prisma.tip.create({
                        data: {
                            matchID: matchID[0].uid,
                            playerID: playerID[0].uid
                        }
                    })
                    message.channel.send('eat my ass')
                } else {
                    message.channel.send('you have already bet on this match.')
                }
            } else {
                message.channel.send('Match has already been closed, you are to late')
            }


        } catch (e) {
            console.log(e)
        }
    }
}

