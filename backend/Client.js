const bcrypt=require("bcryptjs")
var helper=require('./Helper.js')
class Client{
    constructor(mail,mdp){
        this.mail=mail;
        this.mdp=mdp;
    }
    get getMail(){
        return this.mail;
    }
    get getMdp()
    {
        return this.mdp;
    }
    seLogger =function(){
        return new Promise(function(resolve,reject){
            new helper().seConnecter().then(function(db){
                console.log(getMail())
                console.log("huhu")
                const test = db.collection('test')
                bcrypt.hash(this.mdp,10,function(err,hash){
                    console.log(hash)
                var query = {mail:this.mail,mdp:hash}
                test.findOne(query)
                .then(result => {
                    resolve(result)
                })
                .catch(error => console.error(error))
            })
            }).catch(
                error => console.log("Connexion base de donnee echouee")
            )
        })
    }
}
module.exports=Client