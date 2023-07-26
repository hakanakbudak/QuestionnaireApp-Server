const User = require('../models/User');
const Questionnaires = require('../models/Questionnaires');
const jwt = require('jsonwebtoken');

exports.authRegister = (req, res, next) => {

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
    console.log("saved")
    res.send('Saved Successfully')
  } else {
    console.log("maalesef")
  }
};

async function getUserQuestionnaires(userId) {
  try {

    const questionnaires = await Questionnaires.find({ userId: userId }).exec();
    console.log("içerikleri getirdimmmm");
    return questionnaires;

  } catch (err) {
    console.error("İçerikleri getirirken bir hata oluştu:", err);
    throw err;
  }
}

exports.authLogin = async (req, res) => {
  const users = await User.find({ email: req.body.email, password: req.body.password}).exec();
  if (users.length > 0) {
    const user = users[0];
    let data = {
      time: Date(),
      email: req.body.email,
      password:req.body.password,
      _id: user._id 
    }
    const secretKey = "datateam";
    const token = jwt.sign(data, secretKey);
    res.send(token)
  } else {
    res.send(false)
  }
};
