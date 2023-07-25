const User = require('../models/User');

exports.getSetting=async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'Kişi bulunamadı' });
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Bir hata oluştu' });
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