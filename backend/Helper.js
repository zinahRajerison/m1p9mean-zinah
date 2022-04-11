const bcrypt=require("bcryptjs")
const MongoClient = require('mongodb').MongoClient
var url="mongodb+srv://ekalyUser:2EAUIIgK6RUvnkHC@cluster0.ut6sd.mongodb.net/ekaly?retryWrites=true&w=majority"
// const url = 'mongodb://127.0.0.1:27017'
const dbName = 'ekaly'
const md5=require('md5')
var Livreur=require('./Livreur.js')
class Helper{
    seConnecter=function(){
        return new Promise(function(resolve,reject)
        {
            console.log("here")
            MongoClient.connect(url,(err, client) => {
                if(err) console.log(err)
                else{
                    var db = client.db(dbName)
                    console.log(`Connected MongoDB: ${url}`)
                    console.log(`Database: ${dbName}`)
                    resolve(db);
                }
            });
        });
    };
    
    sinscrire = function(ainserer,table){
        this.seConnecter().then(function(db){
            const test = db.collection(table)
            this.findMaxIndex(db,1).then(function(max)
            {
                var query= {
                    _id : 1
                }
                console.log(query)
                ainserer._id=max+1
                ainserer.mdp=md5(ainserer.mdp)
                test.update(query,{'$push':{users:ainserer}})
                .then(result => {
                    console.log(result)
                })
                .catch(error => console.error(error))
            }).catch(function(error){
                    console.log(error)
            })
        }).catch(
            error => console.log("Connexion base de donnee echouee")
        )
    }
    insert = function(ainserer,table){
        return new Promise(function(resolve,reject){
            new Helper().seConnecter().then(function(db){
                console.log(ainserer)
                const test = db.collection(table)
                test.insertOne(ainserer)
                .then(result => {
                    console.log("huhu");
                    resolve(result.insertedId)
                })
                .catch(error => console.error(error))
            }).catch(
                error => console.log("Connexion base de donnee echouee")
            )
        })
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
}
module.exports=Helper;