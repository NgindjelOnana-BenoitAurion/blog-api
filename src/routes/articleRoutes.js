const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articleController');

router.post('/articles', ArticleController.createArticle);
router.get('/articles', ArticleController.getAllArticles);
router.get('/articles/search', ArticleController.searchArticles);
router.get('/articles/:id', ArticleController.getArticleById);
router.put('/articles/:id', ArticleController.updateArticle);
router.delete('/articles/:id', ArticleController.deleteArticle);

module.exports = router;
