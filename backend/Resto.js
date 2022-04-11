var helper=require("./Helper.js")
var md5=require('md5')

class Resto{
    updateResto=function(toUpdate)
    {
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                var resto=toUpdate.toUpdate
                console.log(resto)
                var query = {_id: toUpdate._id,}
                console.log(query)
                var set={
                    $set: {
                        "nomResto":resto.nomResto,"adresse":resto.adresse,"details":resto.details,"logo":resto.logo
                    }
                }
                console.log(set)
                db.collection("resto").findOneAndUpdate(query, set
                )
                .then(result => {
                    resolve(result)
                })
                .catch(error => console.error(error))
            }).catch(
                error => console.log("Connexion base de donnee echouee")
            )
        })
    }
    ajoutResto = function(resto){
        new helper().seConnecter().then(function(db){
            const test = db.collection("resto");
            new Resto().findMaxIndex(db).then(function(max)
            {
                resto._id=max+1
                resto.responsable[0].mdp=md5(resto.responsable[0].mdp)
                test.insertOne(resto)
                .then(result => {
                    console.log(result)
                })
                .catch(error => console.error(error))
            }).catch(function(error){
                    console.log(error)
            })
        }).catch(
            error => console.log(error)
        )
    }
    findMaxIndex = function(db,idUser)
    {
        return new Promise(function(resolve,reject){
            console.log("huh")
            db.collection('resto').aggregate([
                { $group: { _id: 1, max: { $max: '$_id' } } },
                { $project: { max: 1, _id:0 } }
              ]).toArray()
            .then(function(result){
                if((result[0])==null){
                    resolve(0)
                }
                else{
                    resolve(result[0].max)
                }
            }).catch(function(error){
                reject(error)
            })
        })
    }
    deleteResto=function(idResto)
    {
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                var query = {_id: idResto}
                console.log(query)
                db.collection("resto").remove(query)
                .then(result => {
                    resolve(result)
                })
                .catch(error => console.error(error))
            }).catch(
                error => console.log("Connexion base de donnee echouee")
            )
        })
    }
    seLogger =function(mail,mdp){
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                var nvmdp=md5(mdp)
                var query = {"responsable.mail":mail,"responsable.mdp":nvmdp}
                console.log(query)
                db.collection('resto').findOne(query)
                .then(result => {
                    resolve(result)
                })
                .catch(error => console.error(error))
            }).catch(
                error => console.log("Connexion base de donnee echouee")
            )
        })
    }
    rechercherResto =function(arechercher){
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                var query = { details: { $regex: new RegExp(arechercher.specialite,'i')},nomResto: { $regex: new RegExp(arechercher.nom,'i')} ,adresse: { $regex: new RegExp(arechercher.adresse,'i')} } 
                console.log(query)
                db.collection('resto').find(query) .toArray()
                .then(result => {
                    resolve(result)
                })
                .catch(error => console.error(error))
            }).catch(
                error => console.log("Connexion base de donnee echouee")
            )
        })
    }
    
    getStatParJour =function(idResto){
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                var query = { 'plats.idResto': idResto ,'status':"livre" } 
                var group= { _id:  { day: { $dayOfYear: {$toDate:"$dateCommande"} }},
                             totalAmount: { $sum: { $multiply: ["$plats.benefice","$plats.nbre" ] } } }
                console.log(query)
                console.log(group)
                db.collection('resto').aggregate([
                    {$unwind: '$plats' },
                    { $match: query },
                    { $group: group },
                    { $project: { 'totalAmount': 1, _id:1 } }
                ]) .toArray()
                .then(result => {
                    resolve(result[0])
                })
                .catch(error => console.error(error))
            }).catch(
                error => console.log("Connexion base de donnee echouee")
            )
        })
    }
    
}
module.exports=Resto