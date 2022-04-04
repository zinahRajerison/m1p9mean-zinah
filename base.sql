use ekaly

db.createUser({
    user : "m1p9mean-zinah",
    pwd : "123456",
    roles : ["readWrite", "dbAdmin"]
});


db.createCollection('resto'); 
db.resto.insertOne(
    { _id: 1, nomResto: "Korean food", adresse:"Andohatapenaka",logo:"korean.jpg",
        plat:[{_id:1,nom:"ramen",details:"ramen epice ",img:"ramensimple.jpg",prix:30000,benefice:2000},{_id:2,nom:"ramen garnie",details:"ramen epice avec garniture ",img:"ramengarnie.jpg",prix:35000,benefice:2000}],
        livreur:[{idLivreur:1,nom:"Jean",prenom:"Bernard",username:"Bernard",mdp:"mdpBernard"}]
    })
db.resto.insertOne(
    { _id: 2, nomResto: "Chinese food", adresse:"Analakely",logo:"chenese.jpg",
        plat:[{_id:1,nom:"soupe simple",details:"soupe epice ",img:"soupesimple.jpg",prix:30000,benefice:3000},{_id:2,nom:"soupe garnie",details:"soupe epice avec garniture ",img:"soupegarnie.jpg",prix:40000,benefice:2400}],
        livreur:[{idLivreur:1,nom:"Jean",prenom:"Bernard",username:"Bernard",mdp:"mdpBernard"}]
    })
    
db.resto.insertOne(
    { _id: 3, nomResto: "Malagasy food", adresse:"Andohalo",logo:"gasy.jpg",
        plat:[{_id:1,nom:"vary amin'anana",details:"vary miaraka amin'ny anana sy kitoza ",img:"varyanana.jpg",prix:20000,benefice:3500},{_id:2,nom:"vary sy ravitoto",details:"vary sy ravitoto miaraka amin'ny henakisoa",img:"ravitoto.jpg",prix:30000,benefice:3000}],
        livreur:[{idLivreur:1,nom:"Jean",prenom:"Bernard",username:"Bernard",mdp:"mdpBernard"}]
    })
db.resto.update({_id:1},
{'$push':{livreur:{idLivreur:2,nom:"Jeanne",prenom:"Bernardette",username:"Bernardette",mdp:"mdpBernardette"}}})
-- (idResto,nomResto,mdpResponsable,adresse,logo,plat[](idPlat,nom,details,img,prix,benefice),livreur[](idLivreur,nom,prenom,username,mdp))
db.resto.findOne({_id:1});
db.createCollection('client');
-- (idClient,nom,prenom,mail,mdp)

db.createCollection('commande');
-- (idCommande,client(id,nom,prenom),dateHCommande,dateHLivraison,livreur,lieuLivraison,CommandeDetail[](idResto,nomPlat,prix,nbre))

