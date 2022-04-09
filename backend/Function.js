
var helper=require("./Helper.js")
var nodemailer=require('nodemailer');
var md5=require('md5')
var ObjectId=require('mongodb').ObjectId;

class Function{
    findAll =function(table){
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                db.collection(table).find().toArray()
                .then(results => {
                    resolve(results);
                })
                .catch(error => console.error(error))
            }).catch(
                error => console.log("Connexion base de donnee echouee")
            )
        })
        
    }
    findPlat =function(idResto){
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                var query = {_id:idResto}
                console.log(query)
                db.collection("resto").findOne(query)
                .then(results => {
                    resolve(results);
                })
                .catch(error => console.error(error))
            }).catch(
                error => console.log("Connexion base de donnee echouee")
            )
        })
    }
    findCommande =function(idResto){
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                var query = {"plats.idResto":idResto,status:"encours"}
                console.log(query)
                var sort = {dateCommande:1}
                db.collection("commande").find(query).sort(sort).toArray()
                .then(results => {
                    var ret={
                        encours:results
                    }
                    var query = {"plats.idResto":idResto,status:"alivrer"};
                    var sort = {dateCommande:1}
                    db.collection("commande").find(query).sort(sort) .toArray()
                    .then(results => {
                        ret.alivrer=results
                        resolve(ret);
                    })
                    .catch(error => console.error(error))
                })
                .catch(error => console.error(error))
            }).catch(
                error => console.log(error)
            )
        })
    }
    findAllCommande =function(){
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                var query = {status:"alivrer"};
                var sort = {dateCommande:1}
                db.collection("commande").find(query).sort(sort) .toArray()
                .then(results => {
                    resolve(results);
                })
                .catch(error => console.error(error))
            }).catch(
                error => console.log(error)
            )
        })
    }
    sendMail = function(mail){
        return new Promise(function(resolve,reject){
            var transporter=nodemailer.createTransport({host:'smtp.gmail.com',port:465,secure:true,auth:{user:'ekalylivraison@gmail.com',pass:'ekaly123456'}});
            var mailOptions={
                from:'ekalylivraison@gmail.com',
                to:mail,
                subject:'e-kaly Validation Commande',
                text:'Cliquez ce liem pour valider votre derniere commande sur e-kaly'
            }
            transporter.sendMail(mailOptions,function(error,info){
                if(error){
                    reject(error)
                }else{
                    console.log(info.response)
                    resolve('E-mail sent:'+info.response)
                }
            })
        })
    }
     seLogger =function(mail,mdp,typeUser){
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                var nvmdp=md5(mdp)
                var query = {"users.mail":mail,"users.mdp":nvmdp,"_id":typeUser}
                console.log(query)
                db.collection('typeuser').aggregate([
                    { $unwind: '$users' },
                    { $match: query},
                    { $group: { _id: '$_id', users: { $push: '$users' } } },
                    { $project: { 'users': 1, _id:0 } }
                  ]) .toArray()
                .then(result => {
                    resolve(result[0].users[0])
                })
                .catch(error => console.error(error))
            }).catch(
                error => console.log("Connexion base de donnee echouee")
            )
        })
    }
    
    updateCommande =function(idCommande){
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                var query = {_id: new ObjectId(idCommande)}
                console.log(query)
                db.collection("commande").findOneAndUpdate(query,
                {
                    $set: {
                        "status": "alivrer"
                    }
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
module.exports=Function