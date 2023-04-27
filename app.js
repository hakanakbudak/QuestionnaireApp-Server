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
const db = "mongodb+srv://hakanakbudak06:hakan1234@userregister.hgaugqv.mongodb.net/test?retryWrites=true&w=majority";

app.use(express.json())
app.options("*", cors());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})
    .then(() => console.log('MongoDB connection successful.'))
    .catch((error) => console.error("MongoDB connection failed:", error.message))


app.post('/register', (req, res, next) => {
     // Save operations
    const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,//bcrypt.hashSync(req.body.password, 10)
    })
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

    res.send('Saved Successfully')
})

app.post('/login',async (req, res) => {
    // add control from db
    console.log(req.body.email)
    console.log(req.body.password)
    let users = await User.find({ email: req.body.email, password: req.body.password }).exec();
    console.log("**********");
    console.log(users)
    if (users.length > 0) {
        let data = {
            time: Date(),
            email: req.body.email,
        }
        const secretKey = "MoHmggQ8ZyCb";
        const token = jwt.sign(data, secretKey);
        res.send(token)
    } else {
        res.send(false)
    }
})

app.get('/getData', (req, res) => {
    try {
        const token = req.headers.authorization;
        const secretKey = "MoHmggQ8ZyCb";
        const verified = jwt.verify(token, secretKey);
        if (verified) {

            // write get data function
            res.send('Successfull!')
        } else {
            res.send('Invalid Token!')
        }
    } catch (e) {
        return res.send('Invalid Token!');
    }

})



app.post('/create', async (req, res, next) => {
    res.json({ message: 'bu bir create post isteği' })
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

app.put('/update/:id', async (req, res) => {
    // res.json({ message: 'bu bir update isteği' })
    try {
        const { id } = req.params
        const { age, country, city,message } = req.body

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send('post bulunamadi')

        const updatedPerson = { age, country, city,message, _id: id }

        await UserInfo.findByIdAndUpdate(id, updatedPerson, { new: true })

        res.json(updatedPerson)
    } catch (error) {
        console.log(error)
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})