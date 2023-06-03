const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.authRegister=(req, res, next) => {

    const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,//bcrypt.hashSync(req.body.password, 10)

        userBirthDate: req.body.userBirthDate,
        userJob: req.body.userJob,
        userCity: req.body.userCity,
        userEducation: req.body.userEducation,

    })

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
};

exports.authLogin=async (req, res) => {

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
};