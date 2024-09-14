const userServices = require('../services/userService');

const saveUserToDB = async (req, res) => {
    try {
        const userInfo = req.body;
        const user = await userServices.saveUserToDB(userInfo);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateUserCoins = async (req, res) => {
    try {
        const { auth0Id, coins } = req.body;
        await userServices.updateUserCoins(auth0Id, coins);
        res.status(200).send('Coins updated');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addItemToUser = async (req, res) => {
    try {
        const { auth0Id, itemName, quantity } = req.body;
        const item = await userServices.addItemToUser(auth0Id, itemName, quantity);
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    saveUserToDB,
    updateUserCoins,
    addItemToUser,
};
