var helper=require("./Helper.js")
var md5=require('md5')

class Livreur{
    finduser =function(idUser){
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                var query = {_id:idUser}
                console.log(query)
                db.collection("typeuser").find(query).toArray()
                .then(results => {
                    resolve(results);
                })
                .catch(error => console.error(error))
            }).catch(
                error => console.log("Connexion base de donnee echouee")
            )
        })
    }
    updateLivreur=function(toUpdate)
    {
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                var user=toUpdate.toUpdate
                console.log(user)
                var query = {_id: 3,"users._id":toUpdate._id}
                console.log(query)
                var set={
                    $set: {
                        "users.$.username":user.username,"users.$.mail":user.mail,"users.$.mdp":user.mdp
                    }
                }
                console.log(set)
                db.collection("typeuser").findOneAndUpdate(query, set
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
    
    ajoutLivreur = function(ainserer){
        new helper().seConnecter().then(function(db){
            const test = db.collection("typeuser");
            new Livreur().findMaxIndex(db,3).then(function(max)
            {
                var query= {
                    _id : 3
                }
                console.log(query)
                ainserer.toUpdate._id=max+1
                ainserer.toUpdate.mdp=md5(ainserer.toUpdate.mdp)
                test.update(query,{'$push':{users:ainserer.toUpdate}})
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
            db.collection('typeuser').aggregate([
                { $unwind: '$users' },
                { $match: { _id:  idUser}},
                { $group: { _id: 1, max: { $max: '$users._id' } } },
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
    deleteLivreur=function(idLivreur)
    {
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                var query = {_id: 3}
                console.log(query)
                db.collection("typeuser").update(query,
                {
                    $pull: {"users": {_id:idLivreur} }
                })
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
module.exports=Livreur