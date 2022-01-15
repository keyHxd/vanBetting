module.exports = {
    name: 'close',
    description: 'close specific match when requested match is starting!',
    async execute(message, args, prisma) {


        if (message.author.username === '.keyH') {
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
            day = await parseInt(day)
            week = await parseInt(week)
            match = await parseInt(match)

            const matchIDs = await prisma.match.findMany({
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
                            winner: {equals: false}
                        }
                    ]
                },
                select: {
                    uid: true
                }
            })
            console.log(matchIDs)

            if (matchIDs.length > 0 ) {
                for (let x = 0; x < matchIDs.length; x++) {
                    await prisma.match.update({
                        where: {
                            uid: matchIDs[x].uid
                        },
                        data: {
                            winner: true
                        }
                    })
                }
                message.channel.send('match has been closed')
            }
            else {
                message.channel.send('match has already been closed')
            }
        }

    },
};