const express = require('express');
const mongojs = require('mongojs');
const db = mongojs('quiz', ['users', 'area', 'questions', 'game']);

const app = express();

app.get('/data', (req,res) =>{
    res.send("Work fine!!!")
})

app.use(express.json());

var ObjectId = require('mongodb').ObjectID;


//////////////////////   LOGIN  /////////////////////


app.post ('/register', (req, res) =>{
    //Save new user
    db.users.insert({name: req.body.name, pass: req.body.pass, role: req.body.role}, (err,docs) =>{
        res.send("Ok");
    })
})

app.post ('/login', (req, res) =>{
    //finde user from db
    db.users.find({ name: req.body.username, pass: req.body.password}, (err, docs) => {
        //ako se pogresi username ili sifra tada vraca ovo dole
        if (docs[0]==undefined){
            res.send({
                name : "greska"
            })
        }else{
            if (docs.length == 1) {
                res.send({
                    name : docs[0].name,
                    token : docs[0]._id,
                    role : docs[0].role
                })
            }
        }
    })  
})

app.post ('/updateUsers', (req, res) =>{
    //Save new user
    db.users.update({ _id: ObjectId(req.body.token)},{$set:{player: req.body.player, avatar: req.body.avatar}}, (err,docs) =>{
        res.send("Ok");
    })
})


/////////////////////////         ADMIN         //////////////////////////////


app.post ('/addArea', (req, res) =>{
    //Save new area
    db.area.insert({area: req.body.addArea}, (err,docs) =>{
        res.send("Ok");
    })
})

app.post ('/adminUsers', (req, res) =>{
    //finde user from db
    db.users.find({}, (err, docs) => {
        res.send(docs);
    })  
})

app.post ('/removeUsers', (req, res) =>{
    //remove user from db
    db.users.remove({ _id: ObjectId(req.body._id)}, (err, docs) => {
        res.send("Ok");
    })  
})

app.post ('/area', (req, res) =>{
    //finde area from db
    db.area.find({}, (err, docs) => {
        res.send(docs);
    })  
})

app.post ('/removeArea', (req, res) =>{
    //remove area from db
    db.area.remove({ _id: ObjectId(req.body._id)}, (err, docs) => {
        res.send("Ok");
    })  
})

app.post ('/updateArea', (req, res) =>{
    //update area from db
    db.area.update({ _id: ObjectId(req.body._id)},{$set:{area:req.body.area}}, (err, docs) => {
        res.send("Ok");
    })  
})

app.post ('/addQuestion', (req, res) =>{
    //Save new question
    db.questions.insert({question: req.body.question, firstAnswer: req.body.firstAnswer, secondAnswer: req.body.secondAnswer, thirdAnswer: req.body.thirdAnswer, fourthAnswer: req.body.fourthAnswer, correctAnswer: req.body.correctAnswer, area: req.body.area}, (err,docs) =>{
        res.send("Ok");
    })
})

app.post ('/question', (req, res) =>{
    //finde question from db
    db.questions.find({}, (err, docs) => {
        res.send(docs);
    })  
})

app.post ('/removeQuestion', (req, res) =>{
    //remove question from db
    db.questions.remove({ _id: ObjectId(req.body._id)}, (err, docs) => {
        res.send("Ok");
    })  
})

app.post ('/updateQuestion', (req, res) =>{
    //remove area from db
    db.questions.update({ _id: ObjectId(req.body._id)},{$set:{question:req.body.question ,firstAnswer:req.body.firstAnswer, secondAnswer:req.body.secondAnswer, thirdAnswer:req.body.thirdAnswer, fourthAnswer:req.body.fourthAnswer, fifthAnswer:req.body.fifthAnswer, correctAnswer: req.body.correctAnswer}}, (err, docs) => {
        res.send("Ok");
    })  
})

app.post ('/addNumberOfRounds', (req, res) =>{
    //Save new Number of Rounds
    db.game.insert({numberOfRounds: req.body.numberOfRounds}, (err,docs) =>{
        res.send("Ok");
    })
})

app.post ('/numberOfRounds', (req, res) =>{
    //finde Number of Rounds from db
    db.game.find({}, (err, docs) => {
        res.send(docs);
    })  
})

app.post ('/updateNumberOfRounds', (req, res) =>{
    //remove area from db
    console.log(req.body.numberOfRounds);
    db.game.update({ _id: ObjectId(req.body._id)},{$set:{numberOfRounds: req.body.numberOfRounds}}, (err, docs) => {
        res.send("Ok");
    })  
})


app.listen(500, () =>{
    console.log('Server running on port 500');
}
)
