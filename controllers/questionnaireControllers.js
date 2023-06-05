const Questionnaires = require('../models/Questionnaires');
const mongoose = require('mongoose');

exports.getAllQuestionaire = async (req, res) => {
    try {
        const questionnaires = await Questionnaires.find()
        res.json(questionnaires)
    } catch (error) {
        console.log(error)
    }
};

exports.getQuestionnaire = async (req, res) => {
    try {
        const { id } = req.params;

        const questionnaire = await Questionnaires.findById(id);
        if (!questionnaire) {
            return res.status(404).json({ error: 'Kişi bulunamadı' });
        }
        res.json(questionnaire);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Bir hata oluştu' });
    }
};

exports.addQuestionnaire=async (req, res, next) => {

    try {

        const questionnaire = req.body
        const createdQuestionnaire = await Questionnaires.create(questionnaire)

        res.status(201).json(createdQuestionnaire)
        next()
    } catch (error) {
        console.log(error)
    }
}

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

        await Questionnaires.findByIdAndRemove(id,removeQuestionnaire)

        res.json({ message: 'Person b silindi' })

    } catch (error) {
        console.log(error)
    }

};
