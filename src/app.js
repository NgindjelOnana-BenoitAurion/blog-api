const express = require('express');
const articleRoutes = require('./routes/articleRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', articleRoutes);

// Route de base pour tester
app.get('/', (req, res) => {
    res.json({ message: 'API Blog - Bienvenue' });
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

module.exports = app;
