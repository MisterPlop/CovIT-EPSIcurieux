import User from "../models/User.js";

// 🟢 Récupérer tous les users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};

// 🟢 Récupérer un user par son ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};

// 🟢 Créer un user (sans token pour permettre l'inscription)
export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};

// 🔄 Modifier un user
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

        await user.update(req.body);
        res.json({ message: "Utilisateur mis à jour", updatedUser: user });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};

// 🗑 Supprimer un user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

        await user.destroy();
        res.json({ message: "Utilisateur supprimé" });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};


// Fonction test
// export const testUser = async (req, res) => {
//     try {
//         console.log("Hello");
//         res.status(201).json({ message: "Test réussi" });
//     } catch (error) {
//         res.status(500).json({ error: "Erreur lors du test" });
//     }
// };
