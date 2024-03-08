const express = require('express');
const router = express.Router();
const path = require('path'); 
const UserController = require(path.join(__dirname, '../Controllers/UserController')); 
router.post("/ajouter", UserController.AjouterUser);
router.get("/lister", UserController.AfficherUsers);
router.get("/:id", UserController.AfficherUser);
router.delete("/:id/supprimer", UserController.SupprimerUser);
router.put("/:id/modifier", UserController.ModifierUser);
router.get("/afficher/:type",UserController.AfficherUsersParType);
module.exports = router;