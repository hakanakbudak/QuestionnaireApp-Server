const express = require('express')
var cors = require('cors');
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const UserInfo = require('./models/UserInfo');
const UserComment = require('./models/UserComment')
const nodemailer = require('nodemailer');
const db = "mongodb+srv://hakanakbudak06:hakan1234@userregister.hgaugqv.mongodb.net/test?retryWrites=true&w=majority";

app.use(express.json())
app.options("*", cors());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connection successful.'))
    .catch((error) => console.error("MongoDB connection failed:", error.message))

//
console.log(process.versions.openssl);

app.post('/register', (req, res, next) => {
    //res.json({ message: 'bu bir register isteği' })
    const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,//bcrypt.hashSync(req.body.password, 10)

        userBirthDate: req.body.userBirthDate,
        userJob: req.body.userJob,
        userCity: req.body.userCity,
        userEducation: req.body.userEducation,

    })
    //req.body.email != "" && req.body.password != "" && req.body.username != ""
    if (req.body.email != "" && req.body.password != "" && req.body.username != "") {
        newUser.save(), (err => {
            if (err) {
                return res.status(400).json({
                    title: 'error',
                    error: 'email in use'
                })
            }
            return res.status(200).json({
                title: 'signup success'
            })
        })
        console.log("kaydedildi")
        res.send('Saved Successfully')
    } else {
        console.log("maalesef")
    }
})

app.post('/login', async (req, res) => {
    //res.json({ message: 'bu bir login isteği' })
    //console.log(req.body.email)
    //console.log(req.body.password)
    //const users = await User.find({ email: req.body.email, password: req.body.password }).exec();
    //console.log("**********");
    //console.log(users)
    const users = await User.find({ email: req.body.email, password: req.body.password }).exec();
    if (req.body.email != "" && req.body.password != "") {
        if (users.length > 0) {
            let data = {
                time: Date(),
                email: req.body.email,
            }
            const secretKey = "MoHmggQ8ZyCb";
            const token = jwt.sign(data, secretKey);
            res.send(token)
            console.log("kişi bulundu")
        } else {
            console.log("bilgiler geçersiz")
            res.send(false)
            console.log("lütfen alanları doldurun")
        }
    } 
})

app.get('/getData', (req, res) => {
    //res.json({ message: 'bu bir data isteği' })
    try {
        const token = req.headers.authorization;
        const secretKey = "MoHmggQ8ZyCb";
        const verified = jwt.verify(token, secretKey);
        if (verified) {

            res.send('Yeni günün anketleri')
        } else {
            res.send('Invalid Token!')
        }
    } catch (e) {
        return res.send('Invalid Token!');
    }

})



app.post('/create', async (req, res, next) => {
    //res.json({ message: 'bu bir create isteği' })
    //res.json({ message: 'bu bir create post isteği' })
    try {
        const person = req.body
        const createdPerson = await UserInfo.create(person)

        res.status(201).json(createdPerson)
        next()
    } catch (error) {
        console.log(error)
    }
})

app.get('/persons', async (req, res) => {
    //res.json({message:'bu bir  person get isteği'})
    try {
        const persons = await UserInfo.find()
        res.json(persons)
    } catch (error) {
        console.log(error)
    }
})

app.delete('/persons/:id', async (req, res) => {
    //res.json({ message: 'bu bir delete isteği' })

    try {
        const { id } = req.params
        await UserInfo.findByIdAndRemove(id)
        res.json({ message: 'Person b silindi' })

    } catch (error) {
        console.log(error)
    }

})

app.put('openpage/update/:id', async (req, res) => {
    // res.json({ message: 'bu bir update isteği' })
    try {
        const { id } = req.params
        const { selectionOne, selectionTwo, selectionThree, question, category } = req.body

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send('post bulunamadi')

        const updatedPerson = { selectionOne, selectionTwo, selectionThree, question, category, _id: id }

        await UserInfo.findByIdAndUpdate(id, updatedPerson, { new: true })

        res.json(updatedPerson)
    } catch (error) {
        console.log(error)
    }

})

app.post('/comment', async (req, res, next) => {

    try {
        const comment = req.body
        const createdComment = await UserComment.create(comment)

        res.status(201).json(createdComment)
        next()
    } catch (error) {
        console.log(error)
    }
})

app.get('/comment', async (req, res) => {

    try {
        const comment = await UserComment.find()
        res.json(comment)
    } catch (error) {
        console.log(error)
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})