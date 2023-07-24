const Questionnaires = require('../models/Questionnaires');
const User = require('../models/User');
const UserComment = require('../models/UserComment');


exports.createComment  = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body; 

        const questionnaire = await Questionnaires.findById(id);
        if (!questionnaire) {
            return res.status(404).json({ error: 'Anket bulunamadı' });
        }
        console.log(questionnaire)

        
        const newComment = new UserComment({
            comment: comment,
            questionnaireId: id 
        });

        const savedComment = await newComment.save();
        console.log(savedComment)

        res.json({ message: 'Yorum başarıyla oluşturuldu', comment: savedComment });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Bir hata oluştu' });
    }
};

exports.getComment=async (req, res) => {

    try {
        const comment = await UserComment.find()
        res.json(comment)
    } catch (error) {
        console.log(error)
    }
};


