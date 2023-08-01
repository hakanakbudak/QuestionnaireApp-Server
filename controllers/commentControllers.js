const mongoose = require('mongoose');
const Questionnaires = require('../models/Questionnaires');
const User = require('../models/User');
const UserComment = require('../models/UserComment');

exports.createComment = async (req, res) => {
    try {
        const { id, userId } = req.params;
        const { comment } = req.body;

        const questionnaire = await Questionnaires.findById(id);
        const user = await User.findById(userId)
        if (!questionnaire && !user) {
            return res.status(404).json({ error: 'Anket bulunamadı' });
        }
        console.log(questionnaire)


        const newComment = new UserComment({
            comment: comment,
            questionnaireId: id,
            userId: user,
        });

        const savedComment = await newComment.save();
        console.log(savedComment)

        res.json({ message: 'Yorum başarıyla oluşturuldu', comment: savedComment });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Bir hata oluştu' });
    }
};

exports.getComment = async (req, res) => {

    try {
        const comment = await UserComment.find()
        res.json(comment)
    } catch (error) {
        console.log(error)
    }
};

exports.deleteComment = async (req, res) => {
    const { id } = req.params
    try {
        const deletedComment = await UserComment.findByIdAndRemove({ _id: id });
        if (!deletedComment) {
            return res.status(404).json({ message: 'Yorum bulunamadı.' });
        }
        return res.json({ message: 'Yorum başarıyla silindi.' });
    } catch (error) {
        console.error('Yorum silinirken bir hata oluştu:', error);
        return res.status(500).json({ message: 'Yorum silinirken bir hata oluştu.' });
    }
}


