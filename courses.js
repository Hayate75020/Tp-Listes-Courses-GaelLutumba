const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
let courses = [
    { id: 1, nom: "Céréale", quantite: 2 },
    { id: 2, nom: "pain", quantite: 1 },
    { id: 3, nom: "haricot", quantite: 2 },
];

// ✅ Auto-incrémentation
let nextId = 10;

// Lire
app.get("/api/courses", (req, res) => {
    res.json(courses);
});

//Ajouter
app.post("/api/courses", (req, res) => {
    const { nom, quantite } = req.body;
    if (!nom || quantite === undefined) {
        return res.status(400).json({ message: "Nom et quantite sont requis" });
    }
    const newItem = {
        id: nextId++,
        nom,
        quantite
    };
    courses.push(newItem);
    res.status(201).json(newItem);
});

//Modifie
app.put("/api/courses/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nom, quantite } = req.body;
    const item = courses.find(c => c.id === id);
    if (!item) {
        return res.status(404).json({ message: "Produit non trouvé" });
    }
    item.nom = nom !== undefined ? nom : item.nom;
    item.quantite = quantite !== undefined ? quantite : item.quantite;

    res.json(item);
});

//Supprimer 
app.delete("/api/courses/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Produit non trouvé" });
    }
    const deletedItem = courses.splice(index, 1)[0];
    res.json({ message: "Produit supprimé", produit: deletedItem });
});

// ✅ Lancer le serveur
app.listen(port, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});