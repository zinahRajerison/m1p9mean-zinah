use ekaly

db.createUser({
    user : "ekalyUser",
    pwd : "ekaly123456",
    roles : ["readWrite", "dbAdmin"]
});


db.createCollection('resto'); 
---nomResto,adresse,details,plat[],responsable[]
db.resto.insertOne(
    { "_id": 1, "nomResto": "Korean food", "adresse":"Andohatapenaka","details":"Specialite coreenne Boissons Kebab Sushis Ramen ","logo":"korean.jpg",
        "plat":[{"_id":1,"nom":"ramen","details":"ramen epice ","img":"ramensimple.jpg","prix":30000,"benefice":2000},{"_id":2,nom":"ramen garnie","details":"ramen epice avec garniture ","img":"ramengarnie.jpg","prix":35000,"benefice":2000}],
        "responsable":[{"_id":1,"username":"Bernard","mail":"bernard@gmail.com","mdp":"mdpBernard"}]
    })
db.resto.insertOne(
    { "_id": 2, nomResto: "Chinese food", adresse:"Analakely",details:"Specialite chinoise Boissons Soupe Sushis Original ",logo:"chinese.jpg",
        plat:[{_id:1,nom:"soupe simple",details:"soupe epice ",img:"soupesimple.jpg",prix:30000,benefice:3000},{_id:2,nom:"soupe garnie",details:"soupe epice avec garniture ",img:"soupegarnie.jpg",prix:40000,benefice:2400}],
        responsable:[{_id:1,username:"Bernardin",mail:"bernardin@gmail.com",mdp:"mdpBernardin"}]
    })
    
db.resto.insertOne(
    { _id: 3, nomResto: "Malagasy food", adresse:"Andohalo",details:"Specialite malagasy Sakafo manaraka ny fenitra mmalagasy ",logo:"gasy.jpg",
        plat:[{_id:1,nom:"vary amin'anana",details:"vary miaraka amin'ny anana sy kitoza ",img:"varyanana.jpg",prix:20000,benefice:3500},{_id:2,nom:"vary sy ravitoto",details:"vary sy ravitoto miaraka amin'ny henakisoa",img:"ravitoto.jpg",prix:30000,benefice:3000}],
        responsable:[{_id:1,username:"Berthe",mail:"Berthe@gmail.com",mdp:"mdpBerthe"}]
    })
db.resto.update({_id:1},
{'$push':{livreur:{idLivreur:2,nom:"Jeanne",prenom:"Bernardette",username:"Bernardette",mdp:"mdpBernardette"}}})
-- (idResto,nomResto,mdpResponsable,adresse,logo,plat[](idPlat,nom,details,img,prix,benefice),livreur[](idLivreur,nom,prenom,username,mdp))
db.resto.findOne({_id:1});
db.resto.aggregate([
  { $unwind: '$plat' },
  { $match: { _id: 2 }},
  { $group: { _id: 1, max: { $max: '$plat._id' } } },
  { $project: { max: 1, _id:0 } }
]) 
db.resto.update(
    {"_id":1},
    {$pull:{"plat":{_id:4}}}
)

db.createCollection('typeuser');
db.typeuser.insertOne({_id:1,nomTypeUser:"client",users:[{ _id:1,username:'Jean',mail:'jean@gmail.com',mdp:'mdpJean'}]})
db.typeuser.insertOne({_id:2,nomTypeUser:"ekaly",users:[{ _id:1,username:'ekaly',mail:'ekalylivraison@gmail.com',mdp:'ekaly123456'}]})
db.typeuser.insertOne({_id:3,nomTypeUser:"livreur",users:[{ _id:1,username:'Bernard',mail:'bernard@gmail.com',mdp:'mdpBernard'}]})

db.typeuser.update({_id:3},
{'$push':{users:{_id:2,username:"Bernardette",mdp:"mdpBernardette"}}})

-- db.user.insertOne({
--     _id:1,username:'Jean',mail:'jean@gmail.com',mdp:'mdpJean',typeuser:'client'
-- })
-- db.user.insertOne({
--     _id:2,username:'Jean',mail:'jean@gmail.com',mdp:'mdpJean',typeuser:'ekaly'
-- })

-- (iduser,username,mail,mdp,type)

db.createCollection('commande');
-- (idCommande,client(id,nom,prenom),dateHCommande,livreur,lieuLivraison,status,CommandeDetail[](idResto,nomPlat,prix,nbre))

db.commande.find({"plats.idResto":2},{"plats":1,_id:0}).pretty();
db.commande.find({"plats":{"idResto":2}},{"plats":1,_id:0}).pretty();
db.commande.aggregate([
    {$sort:{dateHCommande:1}},
  { $unwind: '$plats' },
  { $match: { 'plats.idResto': 2 }}
]) 
db.commande.findOneAndUpdate({ _id: ObjectId('624d8a98e7ad67ecf8768441') },{$set: {"status": "alivrer"}})

--  db.collection('resto.plat').find({},{"plat._id":1}).sort({"plat._id":-1}).limit(1).toArray()


-- db.resto.find({"plats.dispo":1},{"plats":1,_id:0}.pretty())

-- db.createCollection('ekaly');
db.typeuser.find({
  'users.mail': 'zinahrajery@gmail.com',
  'users.mdp': '1fb9117a6d65ea65d111e2a0b3548053'
}).pretty()

db.typeuser.aggregate([
{$sort:{_id:1}}
]) 


mongodb+srv://ekalyUser:<password>@cluster0.ut6sd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority