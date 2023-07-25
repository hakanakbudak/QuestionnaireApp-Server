const mongoose = require('mongoose');
const multer = require('multer');
const User = require('../models/User');
const path = require("path");

exports.getSetting=async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        console.log(user)
        if (!user) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
        }
        res.json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Bir hata oluştu' });
    }
};

exports.putSetting=async (req, res) => {
    try {
        const { id } = req.params
        const { email, username, password, userBirthDate, userJob, userCity, userEducation } = req.body
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send('post bulunamadi')
        const updatedSetting = { email, username, password, userBirthDate, userJob, userCity, userEducation, _id: id }
        await User.findByIdAndUpdate(id, updatedSetting, { new: true })
        res.json(updatedSetting)
    } catch (error) {
        console.log(error)
    }

};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const filename = file.originalname.replace(/ /g, "_");
      cb(null, filename);
    },
  });
  const upload = multer({ storage });