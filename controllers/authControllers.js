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
        console.log("kaydedildi")
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
/*
exports.authLogin = async (req, res) => {

    const users = await User.find({ email: req.body.email, password: req.body.password }).exec();
    if (req.body.email != "" && req.body.password != "") {
        if (users.length > 0) {
            const userId = users[0]._id;
            const questionnaires = await getUserQuestionnaire(userId);
            let data = {
                time: Date(),
                email: req.body.email,
                questionnaires:questionnaires
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
*/

exports.authLogin = async (req, res) => {
    try {
      const users = await User.find({ email: req.body.email, password: req.body.password }).exec();
      if (req.body.email !== "" && req.body.password !== "") {
        if (users.length > 0) {
          const userId = users[0]._id; // Kullanıcının kimliğini al
          const questionnaires = await getUserQuestionnaires(userId); // Kullanıcının içeriklerini getir
          let data = {
            time: Date(),
            email: req.body.email,
            questionnaires: questionnaires, // Kullanıcının içeriklerini JWT'ye ekle
          };
          const secretKey = "MoHmggQ8ZyCb";
          const token = jwt.sign(data, secretKey);
          res.send(token);
          console.log("Kullanıcı bulundu.");
        } else {
          console.log("Geçersiz bilgiler.");
          res.send(false);
          console.log("Lütfen alanları doldurun.");
        }
      } else {
        console.log("E-posta ve şifre boş bırakılamaz.");
        res.send(false);
      }
    } catch (err) {
      console.error("Giriş işlemi sırasında bir hata oluştu:", err);
      res.status(500).send("Sunucu hatası.");
    }
  };
