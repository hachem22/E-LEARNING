const UserModel =require('../Models/User');
//fonction ajouter les utilisateurs
exports.AjouterUser = async (req, res) => {
  console.log(req.body);
  const userObj = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      type: req.body.type,
      email: req.body.email,
      password: req.body.password
  }

  // Vérifier si le type est valide
  if (userObj.type !== "eleve" && userObj.type !== "enseignant") {
      return res.status(400).json({ error: "Le type d'utilisateur doit être 'eleve' ou 'enseignant'." });
  }

  try {
      const user = new UserModel(userObj);
      const createdUser = await user.save();
      return res.status(200).json({ createdUser });
      // Insertion des données dans la base de données
  } catch (error) {
      return res.status(400).json({ error: error.message });
  }
}

  //fonction pour afficher les  utilisateurs
exports.AfficherUsers = async (req,res)=>{
    try {
        const userList = await UserModel.find({}).exec();
        return res.status(200).json({ userList });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    }
//fonction pour afficher un seule utilisateur
exports.AfficherUser =async (req, res) => {
        const userId = req.params.id;
      
        try {
          const user = await UserModel.findById(userId);
          if (user) {
            console.log("Utilisateur trouvé :", user);
            return res.status(200).json({ user });
          } else {
            console.log("Utilisateur non trouvé");
            return res.status(404).send("Utilisateur non trouvé");
          }
        } catch (error) {
          console.log("Erreur de recherche de l'utilisateur :", error);
          return res.status(500).send("Erreur de recherche de l'utilisateur");
        }
      }
//fonction pour supprimer un utilisateur
exports.SupprimerUser = async (req, res) => {
    const userId = req.params.id;
    try {
      const deletedUser = await UserModel.findOneAndDelete({ _id: userId });
      if (deletedUser) {
        console.log("Utilisateur supprimé :", deletedUser);
        return res.status(200).send("Suppression réussie");
      } else {
        console.log("Utilisateur non trouvé");
        return res.status(404).send("Utilisateur non trouvé");
      }
    } catch (error) {
      console.log("Erreur de suppression :", error);
      return res.status(500).send("Erreur de suppression");
    }
  }
//fonction pour modifier un utilisateur 
exports.ModifierUser = async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedUserData, { new: true });
      if (updatedUser) {
        console.log("Utilisateur modifié :", updatedUser);
        return res.status(200).json({ updatedUser });
      } else {
        console.log("Utilisateur non trouvé");
        return res.status(404).send("Utilisateur non trouvé");
      }
    } catch (error) {
      console.log("Erreur de modification :", error);
      return res.status(500).send("Erreur de modification");
    }
  }
  
  //fonction qui affiche les utilisateurs par type
  exports.AfficherUsersParType = async (req, res) => {
    const { type } = req.params; // On suppose que le type est passé en tant que paramètre dans l'URL

    try {
        // Vérifier si le type est valide
        if (type !== "eleve" && type !== "enseignant") {
            return res.status(400).json({ error: "Le type d'utilisateur doit être 'eleve' ou 'enseignant'." });
        }

        // Recherche des utilisateurs par type
        const users = await UserModel.find({ type }).exec();

        return res.status(200).json({ users });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

