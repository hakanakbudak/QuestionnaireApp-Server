const Questionnaires = require('../models/Questionnaires');
const mongoose = require('mongoose');
const User = require('../models/User');

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

        const user = await User.findById(id);
        if (!userId) {
            return res.status(404).json({ error: 'Kullanıcıya ait anket bulunamadı' });
        }

        console.log(userId)
        console.log(questionnaire)

        if (!questionnaire) {
            return res.status(404).json({ error: 'Kullanıcıya ait anket bulunamadı' });
        }

        const questionnaire = await Questionnaires.find({ userId: userId }).populate('userId');
        
        res.json(questionnaire)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Bir hata oluştu' });
    }
};

exports.addQuestionnaire = async (req, res, next) => {

    const userId = req.body.userId;
    let validUserId;
    try {
        if (userId === "") {
            validUserId = new mongoose.Types.ObjectId(userId); // Boş bir dize yerine yeni bir ObjectId oluştur
            res.status(200).json(validUserId);
        }
        const questionnaire = req.body
        const createdQuestionnaire = await Questionnaires.create(questionnaire)

        res.status(201).json(createdQuestionnaire)
        next()
    } catch (error) {
        console.log(error)
    }
}

/*
exports.getQuestionnaire = async (req, res) => {
    try {
        
        const { userId } = req.params; // Kullanıcının kimliğini URL parametresinden al

        const questionnaires = await Questionnaires.find({ userId: userId });
        if (questionnaires.length === 0) {
            return res.status(404).json({ error: 'Kullanıcıya ait anket bulunamadı'});
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
    try {
        const questionnaire = req.body;
        if (mongoose.Types.ObjectId.isValid(questionnaire.userId)) {
            const createdQuestionnaire = await Questionnaires.create(questionnaire);
            console.log(createdQuestionnaire)
            res.status(201).json(createdQuestionnaire);
        } else {
            res.status(400).json({ message: 'Geçersiz kullanıcı kimliği.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
};
*/

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
