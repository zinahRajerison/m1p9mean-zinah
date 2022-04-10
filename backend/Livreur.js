var helper=require("./Helper.js")
var md5=require('md5')

class Livreur{
    findLivreurs =function(idUser){
        return new Promise(function(resolve,reject){
            new helper().findMaxIndex(db,3).then(function(max)
            {
                console.log("max"+max)
                resolve(max)
            }).catch(function(err){
                console,log(err);
            })
        })
    }
    updateLivreur=function(toUpdate)
    {
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                console.log("db found")
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
        var help=new helper()
        help.seConnecter().then(function(db){
            const test = db.collection("typeuser");
            help.findMaxIndex(db,3).then(function(max)
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