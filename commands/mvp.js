module.exports = {
    name: 'mvp',
    description: 'add mvp entry or show show the mvp vote for the user who wrote the message!',
    async execute(message, args, prisma) {
        console.log(args)
        if (args == '') {
            const mvp = await prisma.mvp.findMany({
                where: {
                    player: {
                        is: {
                            name: message.author.username
                        }
                    }
                },
                select: {
                    tip: true
                }
            })
            if (mvp == ''){
                message.channel.send(`It seems you don't have a MVP vote yet`)
            }
            else {
                message.channel.send(`Your MVP Vote is: ` + mvp[0].tip)
            }
        }
        else {
            const checkForEntry = await prisma.mvp.findMany({
                where: {
                    player: {
                        is: {
                            name: message.author.username
                        }
                    }
                },
                select: {
                    tip: true
                }
            })
            if(checkForEntry == '') {
                const tip = args[0]
                const playerID = await prisma.player.findMany({
                    where: {
                        name: message.author.username
                    },
                    select: {
                        uid: true
                    }
                })

                await prisma.mvp.create({
                    data: {
                        playerID: playerID[0].uid,
                        tip: tip
                    }
                })
            } else {
                message.channel.send('You already have a entry.')
            }
        }
    },
};