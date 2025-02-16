import User from "../models/User.js";

// Récupérer tous les utilisateurs
export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
    }
};

// Ajouter un nouvel utilisateur
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création de l’utilisateur" });
    }
};

// Fonction test
export const testUser = async (req, res) => {
    try {
        console.log("Hello");
        res.status(201).json({ message: "Test réussi" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors du test" });
    }
};
