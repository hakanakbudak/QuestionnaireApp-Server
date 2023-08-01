const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt=require('bcrypt');

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
        const { id } = req.params;
        const { email, username, password, userBirthDate, userJob, userCity, userEducation } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send('Post bulunamadı');
        const updatedSetting = { email, username, userBirthDate, userJob, userCity, userEducation, _id: id };
        if (password) {
            const hashedPassword = bcrypt.hashSync(password, 10);
            updatedSetting.password = hashedPassword;
        }
        const updatedUser = await User.findByIdAndUpdate(id, updatedSetting, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Sunucu hatası: Kullanıcı güncellenemedi' });
    }

};