const app = require('./app');
const dotenv = require('dotenv');

// Configuration des variables d'environnement
dotenv.config();
const PORT = process.env.PORT || 3000;

// Gestion des erreurs non attrapées
process.on('unhandledRejection', (err) => {
  console.error('PROMESSE NON GÉRÉE 💥', err);
  server.close(() => process.exit(1));
});

// Démarrage du serveur
const server = app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});


