// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/gestionclub', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Schéma MongoDB pour les utilisateurs
const userSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    email: String,
    motDePasse: String,
});

const User = mongoose.model('User', userSchema);

// Middleware pour analyser le corps des requêtes au format JSON
app.use(bodyParser.json());

// Endpoint pour l'inscription
app.post('/inscription', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send('Utilisateur inscrit avec succès.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Une erreur est survenue lors de l\'inscription.');
    }
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
