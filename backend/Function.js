
var helper=require("./Helper.js")
var nodemailer=require('nodemailer');
var md5=require('md5')

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
    sendMail = function(mail){
        return new Promise(function(resolve,reject){
            var transporter=nodemailer.createTransport({service:'gmail',auth:{user:'huhu@gmail.com',pass:'huhu'}});
            var mailOptions={
                from:'huhu@gmail.com',
                to:mail,
                subject:'e-kaly Validation Commande',
                text:'Cliquez ce liem pour valider votre derniere commande sur e-kaly'
            }
            transporter.sendMail(mailOptions,function(error,info){
                if(error){
                    reject(error)
                }else{
                    resolve('E-mail sent:'+info.response)
                }
            })
        })
    }
     seLogger =function(mail,mdp){
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                var nvmdp=md5(mdp)
                var query = {mail:mail,mdp:nvmdp}
                db.collection('test').findOne(query)
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