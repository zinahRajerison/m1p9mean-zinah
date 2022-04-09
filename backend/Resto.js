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
                console.log(result)
                resolve(result[0].max)
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
                // var nvmdp=md5(mdp)
                var query = {"responsable.mail":mail,"responsable.mdp":mdp}
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
}
module.exports=Resto