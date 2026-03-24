const db = require('../config/database');

// Helper pour parser les tags (stockés en JSON dans SQLite)
const parseTags = (tags) => {
    if (!tags) return [];
    try {
        return JSON.parse(tags);
    } catch {
        return tags.split(',').map(t => t.trim());
    }
};

const stringifyTags = (tags) => {
    if (!tags) return null;
    if (Array.isArray(tags)) return JSON.stringify(tags);
    return tags;
};

const ArticleModel = {
    // Créer un article
    create: (article, callback) => {
        const { titre, contenu, auteur, categorie, tags } = article;
        const tagsStr = stringifyTags(tags);
        
        const sql = `INSERT INTO articles (titre, contenu, auteur, categorie, tags) 
                     VALUES (?, ?, ?, ?, ?)`;
        
        db.run(sql, [titre, contenu, auteur, categorie, tagsStr], function(err) {
            if (err) return callback(err);
            callback(null, { id: this.lastID });
        });
    },

    // Récupérer tous les articles (avec filtres optionnels)
    findAll: (filters, callback) => {
        let sql = `SELECT * FROM articles`;
        const params = [];
        const conditions = [];

        if (filters.categorie) {
            conditions.push('categorie = ?');
            params.push(filters.categorie);
        }
        if (filters.auteur) {
            conditions.push('auteur = ?');
            params.push(filters.auteur);
        }
        if (filters.date) {
            conditions.push('date LIKE ?');
            params.push(filters.date + '%');
        }

        if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' AND ');
        }

        sql += ' ORDER BY date DESC';

        db.all(sql, params, (err, rows) => {
            if (err) return callback(err);
            
            // Parser les tags pour chaque article
            const articles = rows.map(article => ({
                ...article,
                tags: parseTags(article.tags)
            }));
            
            callback(null, articles);
        });
    },

    // Récupérer un article par ID
    findById: (id, callback) => {
        const sql = `SELECT * FROM articles WHERE id = ?`;
        
        db.get(sql, [id], (err, article) => {
            if (err) return callback(err);
            if (article) {
                article.tags = parseTags(article.tags);
            }
            callback(null, article);
        });
    },

    // Mettre à jour un article
    update: (id, updates, callback) => {
        const fields = [];
        const params = [];
        
        if (updates.titre !== undefined) {
            fields.push('titre = ?');
            params.push(updates.titre);
        }
        if (updates.contenu !== undefined) {
            fields.push('contenu = ?');
            params.push(updates.contenu);
        }
        if (updates.categorie !== undefined) {
            fields.push('categorie = ?');
            params.push(updates.categorie);
        }
        if (updates.tags !== undefined) {
            fields.push('tags = ?');
            params.push(stringifyTags(updates.tags));
        }
        
        if (fields.length === 0) {
            return callback(new Error('Aucun champ à mettre à jour'));
        }
        
        params.push(id);
        const sql = `UPDATE articles SET ${fields.join(', ')} WHERE id = ?`;
        
        db.run(sql, params, function(err) {
            if (err) return callback(err);
            callback(null, { changes: this.changes });
        });
    },

    // Supprimer un article
    delete: (id, callback) => {
        const sql = `DELETE FROM articles WHERE id = ?`;
        
        db.run(sql, [id], function(err) {
            if (err) return callback(err);
            callback(null, { deleted: this.changes });
        });
    },

    // Rechercher par titre ou contenu
    search: (query, callback) => {
        const sql = `SELECT * FROM articles 
                     WHERE titre LIKE ? OR contenu LIKE ?
                     ORDER BY date DESC`;
        const searchTerm = `%${query}%`;
        
        db.all(sql, [searchTerm, searchTerm], (err, rows) => {
            if (err) return callback(err);
            const articles = rows.map(article => ({
                ...article,
                tags: parseTags(article.tags)
            }));
            callback(null, articles);
        });
    }
};

module.exports = ArticleModel;
