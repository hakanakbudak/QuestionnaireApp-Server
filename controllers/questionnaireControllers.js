const Questionnaires = require('../models/Questionnaires');
const mongoose = require('mongoose');
const User = require('../models/User');
const { errorMonitor } = require('nodemailer/lib/xoauth2');

/*
exports.getAllQuestionaire = async (req, res) => {
    try {
        const questionnaires = await Questionnaires.find()
        res.json(questionnaires)
    } catch (error) {
        console.log(error)
    }
};
*/

exports.getQuestionnaire = async (req, res) => {
    try {
        const { id, userId } = req.params;
        
    
        const questionnaire = await Questionnaires.findOne({ userId: userId });
        const user = await User.findById(id);

        console.log(id)
        console.log(questionnaire)
        
        if (!questionnaire || questionnaire.userId !== user._id) {
            return res.status(404).json({ error: 'Kullanıcıya ait anket bulunamadı' });
        }
        
        res.json({ questionnaire, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Bir hata oluştu' });
    }
};

/*
exports.getQuestionnaire = async (req, res) => {
    try {
        
        const { userId } = req.params; // Kullanıcının kimliğini URL parametresinden al

        const questionnaires = await Questionnaires.find({ userId: userId });
        if (questionnaires.length === 0) {
            return res.status(404).json({ error: 'Kullanıcıya ait anket bulunamadı' });
        }
        res.json(questionnaires);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Bir hata oluştu' });
    }
};
*/
/*
exports.addQuestionnaire = async (req, res, next) => {

    const userId = req.body.userId;
    let validUserId;
    if (userId === "") {
        validUserId =new mongoose.Types.ObjectId(); // Boş bir dize yerine yeni bir ObjectId oluştur
    } else {
        validUserId = mongoose.Types.ObjectId(userId); // Geçerli bir ObjectId'e dönüştür
    }
    try {
        const questionnaire = req.body
        const createdQuestionnaire = await Questionnaires.create(questionnaire)

        res.status(201).json(createdQuestionnaire)
        next()
    } catch (error) {
        console.log(error)
    }
}*/

exports.addQuestionnaire = async (req, res, next) => {
    try {
        const questionnaire = req.body;
        if (mongoose.Types.ObjectId.isValid(questionnaire.userId)) {
            const createdQuestionnaire = await Questionnaires.create(questionnaire);
            res.status(201).json(createdQuestionnaire);
        } else {
            res.status(400).json({ message: 'Geçersiz kullanıcı kimliği.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
};

exports.putQuestionnaire = async (req, res) => {
    try {
        const { id } = req.params
        const { selectionOne, selectionTwo, selectionThree, question, category } = req.body

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send('post bulunamadi')

        const updatedQuestionnaire = { selectionOne, selectionTwo, selectionThree, question, category, _id: id }

        await Questionnaires.findByIdAndUpdate(id, updatedQuestionnaire, { new: true })

        res.json(updatedQuestionnaire)
    } catch (error) {
        console.log(error)
    }
};

exports.deleteQuestionnaire = async (req, res) => {
    try {
        const { id } = req.params
        const { selectionOne, selectionTwo, selectionThree, question, category } = req.body

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send('post bulunamadi')

        const removeQuestionnaire = { selectionOne, selectionTwo, selectionThree, question, category, _id: id }

        await Questionnaires.findByIdAndRemove(id, removeQuestionnaire)

        res.json({ message: 'Person b silindi' })

    } catch (error) {
        console.log(error)
    }

};
