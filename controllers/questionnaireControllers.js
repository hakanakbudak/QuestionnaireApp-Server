const Questionnaires = require('../models/Questionnaires');
const mongoose = require('mongoose');
const User = require('../models/User');
const UserComment = require('../models/UserComment');
const QuestionnaireVote = require('../models/QuestionnairesVote');
const jwt = require('jsonwebtoken');

exports.getQuestionnaireUserSelection = async (req, res) => {
    try {
        const { selectionId, questionnaireId, userId } = req.body;
        
        await QuestionnaireVote.create({ selectionId, questionnaireId, userId });
        res.status(200).json({ message: "Seçim başarıyla kaydedildi." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Bir hata oluştu." });
    }
};

exports.getQuestionnaireVoteResult = async (req, res) => {
    try {
        const totalVotes = await QuestionnaireVote.countDocuments();
        const selectionARatio = ((await QuestionnaireVote.countDocuments({ selectionId: 1 })) / totalVotes) * 100;
        const selectionBRatio = ((await QuestionnaireVote.countDocuments({ selectionId: 2 })) / totalVotes) * 100;
        const selectionCRatio = ((await QuestionnaireVote.countDocuments({ selectionId: 3 })) / totalVotes) * 100;

        res.status(200).json({ selectionARatio, selectionBRatio, selectionCRatio });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Bir hata oluştu." });
    }
};


exports.getQuestionnaireComment = async (req, res) => {
    try {
        const { id, questionnaireId } = req.params;
        const questionnaire = await Questionnaires.findById(id);
        const comments = await UserComment.find({ questionnaireId: questionnaireId }).populate('questionnaireId');
        if (!comments && !questionnaire) {
            return res.status(404).json({ error: 'Kullanıcı ve ait anket bulunamadı' });
        }
        res.json(comments)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Bir hata oluştu' });
    }
};

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
        const { _id, userId } = req.params;
        const user = await User.findById(_id);
        const questionnaire = await Questionnaires.find({ userId: userId }).populate('userId');
        if (!questionnaire && !user) {
            return res.status(404).json({ error: 'Kullanıcı ve ait anket bulunamadı' });
        }
        res.json(questionnaire)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Bir hata oluştu' });
    }
};

exports.addQuestionnaire = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'datateam');
        const userId = decodedToken._id;
        const questionnaire = req.body;
        questionnaire.questionnaireDate = new Date();
        questionnaire.userId = userId;
        const createdQuestionnaire = await Questionnaires.create(questionnaire);
        res.status(201).json({ ...createdQuestionnaire._doc, questionnaireDate: questionnaire.questionnaireDate });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while saving the questionnaire." });
    }
};

exports.putQuestionnaire = async (req, res) => {
    try {
        const { id } = req.params
        const { selectionOne, selectionTwo, selectionThree, question, category, questionnaireDate } = req.body
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send('post bulunamadi')
        const updatedQuestionnaire = { selectionOne, selectionTwo, selectionThree, question, category, questionnaireDate, _id: id }
        await Questionnaires.findByIdAndUpdate(id, updatedQuestionnaire, { new: true })
        res.json(updatedQuestionnaire)
    } catch (error) {
        console.log(error)
    }
};

exports.deleteQuestionnaire = async (req, res) => {
    try {
        const { id } = req.params
        const { selectionOne, selectionTwo, selectionThree, question, category, questionnaireDate } = req.body
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send('post bulunamadi')

        const removeQuestionnaire = { selectionOne, selectionTwo, selectionThree, question, category, questionnaireDate, _id: id }
        await Questionnaires.findByIdAndRemove(id, removeQuestionnaire)
        res.json({ message: 'Person b silindi' })
    } catch (error) {
        console.log(error)
    }
};