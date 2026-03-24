const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erreur de connexion à la BD:', err.message);
    } else {
        console.log('Connecté à la base SQLite');
    }
});

// Création de la table articles
db.run(`
    CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titre TEXT NOT NULL,
        contenu TEXT NOT NULL,
        auteur TEXT NOT NULL,
        date TEXT DEFAULT (datetime('now')),
        categorie TEXT,
        tags TEXT
    )
`, (err) => {
    if (err) {
        console.error('Erreur création table:', err.message);
    } else {
        console.log('Table articles prête');
    }
});

module.exports = db;
