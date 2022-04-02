use ekaly

db.createUser({
    user : "m1p9mean-zinah",
    pwd : "123456",
    roles : ["readWrite", "dbAdmin"]
});


db.createCollection('Resto'); 
db.Resto.insertOne(
    { _id: 1, nomResto: "Korean food", adresse:"Andohatapenaka",logo:"korean.jpg",
        plat:[{_id:1,nom:"ramen",details:"ramen epice ",img:"ramensimple.jpg",benefice:2000},{_id:1,nom:"ramen garnie",details:"ramen epice avec garniture ",img:"ramengarnie.jpg",benefice:2000}],
        livreur:[{idLivreur:1,nom:"Jean",prenom:"Bernard",username:"Bernard",mdp:"mdpBernard"}]
    })
db.Resto.insertOne(
    { _id: 2, nomResto: "Chinese food", adresse:"Analakely",logo:"chenese.jpg",
        plat:[{_id:1,nom:"soupe simple",details:"soupe epice ",img:"soupesimple.jpg",benefice:3000},{_id:2,nom:"soupe garnie",details:"soupe epice avec garniture ",img:"soupegarnie.jpg",benefice:2400}],
        livreur:[{idLivreur:1,nom:"Jean",prenom:"Bernard",username:"Bernard",mdp:"mdpBernard"}]
    })
    
db.Resto.insertOne(
    { _id: 3, nomResto: "Malagasy food", adresse:"Andohalo",logo:"gasy.jpg",
        plat:[{_id:1,nom:"vary amin'anana",details:"vary miaraka amin'ny anana sy kitoza ",img:"varyanana.jpg",benefice:3500},{_id:2,nom:"vary sy ravitoto",details:"vary sy ravitoto miaraka amin'ny henakisoa",img:"ravitoto.jpg",benefice:3000}],
        livreur:[{idLivreur:1,nom:"Jean",prenom:"Bernard",username:"Bernard",mdp:"mdpBernard"}]
    })
db.Resto.update({_id:1},
{'$push':{livreur:{idLivreur:2,nom:"Jeanne",prenom:"Bernardette",username:"Bernardette",mdp:"mdpBernardette"}}})
-- (idResto,nomResto,mdpResponsable,adresse,logo,plat[](idPlat,nom,details,img,benefice),livreur[](idLivreur,nom,prenom,username,mdp))
db.Resto.findOne({_id:1});
db.createCollection('Client');
-- (idClient,nom,prenom,mail,mdp)

db.createCollection('Commande');
-- (idCommande,client(id,nom,prenom),dateHCommande,dateHLivraison,livreur,CommandeDetail[](nomPlat,prix,nbre))

