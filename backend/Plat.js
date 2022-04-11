var helper=require("./Helper.js")

class Plat{
    ajoutPlat = function(ainserer){
        new helper().seConnecter().then(function(db){
            console.log(ainserer._id)
            const test = db.collection("resto");
            new Plat().findMaxIndex(db,ainserer._id).then(function(max)
            {
                var query= {
                    _id : ainserer._id
                }
                console.log(query)
                ainserer.toUpdate._id=max+1
                test.update(query,{'$push':{plat:ainserer.toUpdate}})
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
    findMaxIndex = function(db,idResto)
    {
        return new Promise(function(resolve,reject){
            console.log("huh")
            db.collection('resto').aggregate([
                { $unwind: '$plat' },
                { $match: { _id:  idResto}},
                { $group: { _id: 1, max: { $max: '$plat._id' } } },
                { $project: { max: 1, _id:0 } }
              ]).toArray()
            .then(function(result){
                console.log(result)
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
    deletePlat=function(idResto,idPlat)
    {
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                var query = {_id: idResto}
                console.log(query)
                db.collection("resto").update(query,
                {
                    $pull: {"plat": {_id:idPlat} }
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
    updatePlat=function(toUpdate)
    {
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                var plat=toUpdate.toUpdate
                var query = {_id: toUpdate._id,"plat._id":plat.idPlat}
                console.log(query)
                var set={
                    $set: {
                        "plat.$.nom":plat.nom,"plat.$.details":plat.details,"plat.$.prix":plat.prix,"plat.$.benefice":plat.benefice,"plat.$.img":plat.img
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
    rechercherPlat =function(arechercher){
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                var query = { "plat.nom": { $regex: new RegExp(arechercher.nom,'i')},"plat.prix": { $lt: arechercher.prix} ,_id:arechercher.idResto } 
                console.log(query)
                db.collection('resto').aggregate([
                    { $unwind: '$plat' },
                    { $match: query},
                    { $group: { _id: '$_id', plat: { $push: '$plat' } } },
                    { $project: { 'plat': 1, _id:0 } }
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
module.exports=Plat