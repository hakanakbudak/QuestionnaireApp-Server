const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.authRegister = (req, res, next) => {
  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    userBirthDate: req.body.userBirthDate,
    userJob: req.body.userJob,
    userCity: req.body.userCity,
    userEducation: req.body.userEducation,

  })
  newUser.save()
    .then(savedUser => {
      console.log('User saved...', savedUser);
      res.send(savedUser)
    })
    .catch(error => {
      console.error('User is not saved !', error);
    });
  },

  exports.authLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).exec();
      if (!user) {

        return res.send(false);
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.send(false);
      }
      const data = {
        time: Date(),
        email: email,
        _id: user._id,
      };

      const secretKey = "datateam";
      const token = jwt.sign(data, secretKey);
      res.send(token);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Sunucu hatası: Giriş yapılamadı' });
    }
  };

exports.userUpdate = async (req, res) => {

  try {
    const { id } = req.params
    const { email, username, password, userBirthDate, userJob, userCity, userEducation } = req.body

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send('post bulunamadi')

    const updatedUser = { email, username, password, userBirthDate, userJob, userCity, userEducation, _id: id }

    await User.findByIdAndUpdate(id, updatedUser, { new: true })

    res.json(updatedUser)
  } catch (error) {
    console.log(error)
  }
};