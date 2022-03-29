
const MongoClient = require('mongodb').MongoClient
// var connectString="mongodb+srv://<m1p9mean-zinah>:<123456>@<clustername>-rmp3c.mongodb.net/test?retryWrites=true&w=majority"
const url = 'mongodb://127.0.0.1:27017'
const dbName = 'test'
let db

function seConnecter(){
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) return console.log(err)
    
        // Storing a reference to the database so you can use it later
        db = client.db(dbName)
        console.log(`Connected MongoDB: ${url}`)
        console.log(`Database: ${dbName}`)
    })
    return db
}
function sinscrire(ainserer)
{
    db=seConnecter()
    const test = db.collection(dbName)
    test.insertOne(ainserer)
        .then(result => {
        console.log(result)
        })
        .catch(error => console.error(error))

}
exports.sinscrire=sinscrire;