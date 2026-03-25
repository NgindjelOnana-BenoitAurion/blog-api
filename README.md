
# 📝 Blog API Backend

API backend  de gestion d’articles de blog développée avec Node.js, Express et MySQL.

---

## 🚀 Fonctionnalités

- Créer un article
- Lire tous les articles
- Lire un article par ID
- Modifier un article
- Supprimer un article
- Rechercher des articles

---

## 🛠️ Technologies utilisées

- Node.js
- Express
- MySQL
- Postman (pour les tests)

---

## 📦 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/TON-USERNAME/blog-api.git
cd blog-api
````

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer la base de données

Créer une base MySQL :

```sql
CREATE DATABASE blog_api;
```

Créer la table :

```sql
USE blog_api;

CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  contenu TEXT,
  auteur VARCHAR(100) NOT NULL,
  date DATE,
  categorie VARCHAR(50),
  tags VARCHAR(100)
);
```

### 4. Configurer la connexion

Modifier le fichier `db.js` :

```js
const db = mysql.createPool({
  host: "localhost",
  user: "bloguser",
  password: "motdepasse",
  database: "blog_api"
});
```

---

## ▶️ Lancer le serveur

```bash
node app.js
```

Le serveur démarre sur :

```
http://localhost:3000
```

---

## 📡 Endpoints API

### 🔹 Créer un article

```
POST /api/articles
```

Body JSON :

```json
{
  "titre": "Mon article",
  "contenu": "Contenu ici",
  "auteur": "Nom",
  "date": "2026-03-23",
  "categorie": "Tech",
  "tags": "node,api"
}
```

---

### 🔹 Obtenir tous les articles

```
GET /api/articles
```

---

### 🔹 Obtenir un article

```
GET /api/articles/:id
```

---

### 🔹 Modifier un article

```
PUT /api/articles/:id
```

---

### 🔹 Supprimer un article

```
DELETE /api/articles/:id
```

---

### 🔹 Rechercher

```
GET /api/articles/search/query?q=mot
```

---

## 📸 Tests

Les tests ont été réalisés avec Postman et beaucoup plus Terminal.

---

blog-api/
│
├── src/                          # Code source principal
│   ├── controllers/              # Contrôleurs (logique métier)
│   │   └── articleController.js
│   ├── models/                   # Modèles (accès base de données)
│   │   └── articleModel.js
│   ├── routes/                   # Routes (définition des endpoints)
│   │   └── articleRoutes.js
│   ├── config/                   # Configuration
│   │   └── database.js
│   └── app.js                    # Configuration Express
│
├── server.js                     # Point d'entrée du serveur
├── .env                          # Variables d'environnement
├── .gitignore                    # Fichiers à ignorer par Git
├── package.json                  # Dépendances et scripts
├── package-lock.json             # Verrouillage des versions
├── README.md                     # Documentation du projet
└── database.sqlite               # Fichier de base de données (créé automatiquement)
