const Questionnaires = require('../models/Questionnaires');
const mongoose = require('mongoose');
const User = require('../models/User');
const UserComment = require('../models/UserComment');
const QuestionnaireVote = require('../models/QuestionnairesVote');
const jwt = require('jsonwebtoken');

// Kullanıcının seçimini kaydetme endpoint'i
exports.getQuestionnaireUserSelection= async (req, res) => {
    try {
        const { selectionId, userId, questionnaireId } = req.body;
    
        // MongoDB'ye kullanıcının seçimini kaydet
        await QuestionnaireVote.create({ selectionId, userId, questionnaireId });
    
        res.status(200).json({ message: "Seçim başarıyla kaydedildi." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Bir hata oluştu." });
      }
  };
  
  // Anket sonuçlarını alma endpoint'i
exports.getQuestionnaireVoteResult= async (req, res) => {
    try {
      // MongoDB'den anket sonuçlarını al ve hesapla
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

        //console.log(questionnaire)
        //console.log(comments)

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
        const { id, userId } = req.params;

        const user = await User.findById(id);
        const questionnaire = await Questionnaires.find({ userId: userId }).populate('userId');

        console.log(userId)
        console.log(questionnaire)

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
        // Extract the JWT token from the request headers
        const token = req.headers.authorization.split(' ')[1];
        
        // Decode the JWT token to get the user id
        const decodedToken = jwt.verify(token, 'datateam'); // Replace 'datateam' with your actual JWT secret key
        
        // Now you can access the userId from the decodedToken
        const userId = decodedToken._id;

        const questionnaire = req.body;
        questionnaire.questionnaireDate = new Date();
        questionnaire.userId = userId; // Assign the userId to the questionnaire

        // Assuming Questionnaires is your mongoose model for the questionnaire schema
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