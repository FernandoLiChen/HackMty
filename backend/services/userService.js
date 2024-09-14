const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const saveUserToDB = async (userInfo) => {
    const auth0Id = userInfo.sub;
    const email = userInfo.email;

    const user = await prisma.user.findUnique({
        where: { auth0Id },
    });

    if (!user) {
        return await prisma.user.create({
            data: {
                auth0Id,
                email,
                coins: 0,
            },
        });
    }
};

const updateUserCoins = async (auth0Id, newCoins) => {
    return await prisma.user.update({
        where: { auth0Id },
        data: {
            coins: newCoins,
        },
    });
};

const addItemToUser = async (auth0Id, itemName, quantity) => {
    const user = await prisma.user.findUnique({
        where: { auth0Id },
    });

    if (user) {
        return await prisma.item.create({
            data: {
                name: itemName,
                userId: user.id,
                quantity: quantity, // Añadí `quantity` aquí según tu lógica
            },
        });
    }
};

module.exports = {
    saveUserToDB,
    updateUserCoins,
    addItemToUser,
};
