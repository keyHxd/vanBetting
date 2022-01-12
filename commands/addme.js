module.exports = {
    name: 'addme',
    description: 'add player who called this command to the competition!',
    async execute(message, args, prisma) {
        const author = message.author.username
        const dbUser = await prisma.player.findMany({
            where: {
                name: author
            }
        })

        if (dbUser <= 0) {
            await  prisma.player.create({
                data: {
                    name: author
                }
            })

            await message.channel.send(`user ${author} has been added to the game! good luck`)
        }
        else {
            await message.channel.send('user has already entered the game!')
        }
    },
};