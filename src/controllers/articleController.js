const ArticleModel = require('../models/articleModel');

// Validation des entrées
const validateArticle = (data) => {
    const errors = [];
    
    if (!data.titre || data.titre.trim() === '') {
        errors.push('Le titre est obligatoire');
    }
    if (!data.contenu || data.contenu.trim() === '') {
        errors.push('Le contenu est obligatoire');
    }
    if (!data.auteur || data.auteur.trim() === '') {
        errors.push('L\'auteur est obligatoire');
    }
    
    return errors;
};

const ArticleController = {
    // POST /api/articles
    createArticle: (req, res) => {
        const { titre, contenu, auteur, categorie, tags } = req.body;
        
        // Validation
        const errors = validateArticle({ titre, contenu, auteur });
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        
        ArticleModel.create({ titre, contenu, auteur, categorie, tags }, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur serveur', details: err.message });
            }
            res.status(201).json({ 
                message: 'Article créé avec succès', 
                id: result.id 
            });
        });
    },

    // GET /api/articles
    getAllArticles: (req, res) => {
        const filters = {
            categorie: req.query.categorie,
            auteur: req.query.auteur,
            date: req.query.date
        };
        
        ArticleModel.findAll(filters, (err, articles) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur serveur', details: err.message });
            }
            res.status(200).json(articles);
        });
    },

    // GET /api/articles/:id
    getArticleById: (req, res) => {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID invalide' });
        }
        
        ArticleModel.findById(id, (err, article) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur serveur', details: err.message });
            }
            if (!article) {
                return res.status(404).json({ error: 'Article non trouvé' });
            }
            res.status(200).json(article);
        });
    },

    // PUT /api/articles/:id
    updateArticle: (req, res) => {
        const id = parseInt(req.params.id);
        const updates = req.body;
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID invalide' });
        }
        
        // Vérifier que l'article existe
        ArticleModel.findById(id, (err, article) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur serveur', details: err.message });
            }
            if (!article) {
                return res.status(404).json({ error: 'Article non trouvé' });
            }
            
            ArticleModel.update(id, updates, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Erreur serveur', details: err.message });
                }
                res.status(200).json({ 
                    message: 'Article mis à jour avec succès',
                    changes: result.changes
                });
            });
        });
    },

    // DELETE /api/articles/:id
    deleteArticle: (req, res) => {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID invalide' });
        }
        
        ArticleModel.findById(id, (err, article) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur serveur', details: err.message });
            }
            if (!article) {
                return res.status(404).json({ error: 'Article non trouvé' });
            }
            
            ArticleModel.delete(id, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Erreur serveur', details: err.message });
                }
                res.status(200).json({ 
                    message: 'Article supprimé avec succès',
                    deleted: result.deleted
                });
            });
        });
    },

    // GET /api/articles/search?query=texte
    searchArticles: (req, res) => {
        const query = req.query.query;
        
        if (!query || query.trim() === '') {
            return res.status(400).json({ error: 'Le paramètre de recherche est requis' });
        }
        
        ArticleModel.search(query, (err, articles) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur serveur', details: err.message });
            }
            res.status(200).json(articles);
        });
    }
};

module.exports = ArticleController;
