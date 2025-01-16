const User = require('../models/User');

// Récupérer tous les utilisateurs
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
};

// Ajouter un nouvel utilisateur
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' });
    }
};

const testUser = async (req, res) => {
    try {
        console.log("Hello")
        print("Hello World!")
        res.status(201).json();
    } catch{
        res.status(500).json({error: 'Prout'})
    }
}

module.exports = { getUsers, createUser, testUser };
