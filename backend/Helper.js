const bcrypt=require("bcryptjs")
const MongoClient = require('mongodb').MongoClient
// var connectString="mongodb+srv://<m1p9mean-zinah>:<123456>@<clustername>-rmp3c.mongodb.net/test?retryWrites=true&w=majority"
const url = 'mongodb://127.0.0.1:27017'
const dbName = 'ekaly'
const md5=require('md5')

class Helper{
    seConnecter=function(){
        return new Promise(function(resolve,reject)
        {
            MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
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
            ainserer.mdp=md5(ainserer.mdp)
            test.insertOne(ainserer)
            .then(result => {
                console.log(result)
            })
            .catch(error => console.error(error))
        }).catch(
            error => console.log("Connexion base de donnee echouee")
        )
    }
}
module.exports=Helper;