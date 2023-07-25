const express = require('express');
const cors = require('cors');
const router = express();
const bodyParser = require('body-parser');

const AuthController = require('../controllers/authControllers');
const QuestionnaireController = require('../controllers/questionnaireControllers');
const SearchController = require('../controllers/searchControllers');
const CommentController = require('../controllers/commentControllers');
const SettingController = require('../controllers/settingControllers');

router.use(express.json());
router.options("*", cors());
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// getData
router.get('/getData', (req, res) => {
    try {
        const token = req.headers.authorization;
        const secretKey = "MoHmggQ8ZyCb";
        const verified = jwt.verify(token, secretKey);
        if (verified) {

            // write get data function
            res.send('Successfull!')
        } else {
            res.send('Invalid Token!')
        }
    } catch (e) {
        return res.send('Invalid Token!');
    }

});

// update register
router.put('/register/:id', async (req, res) => {

    try {
        const { id } = req.params
        const { email, username, password, userBirthDate, userJob, userCity, userEducation } = req.body

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send('post bulunamadi')

        const updatedUser = { email, username, password, userBirthDate, userJob, userCity, userEducation, _id: id }

        await User.findByIdAndUpdate(id, updatedUser, { new: true })

        res.json(updatedUser)
    } catch (error) {
        console.log(error)
    }

})

// add user
router.post('/register', AuthController.authRegister);

// login user
router.post('/login', AuthController.authLogin);

// get all questionnaire
router.get('/questionnaire', QuestionnaireController.getAllQuestionaire);

router.get('/questionnaire/:userId', QuestionnaireController.getQuestionnaire);

// add questionnaire
router.post('/questionnaire/create/:id', QuestionnaireController.addQuestionnaire);

// update questionnaire
router.put('/questionnaire/:id', QuestionnaireController.putQuestionnaire);

// questionnaire delete
router.delete('/questionnaire/:id', QuestionnaireController.deleteQuestionnaire);

// questionnaire search
router.get('/search', SearchController.getAllSearch);

// add comment
router.post('/questionnaire/comment/:id', CommentController.createComment);

// get questionnaire comment 
router.get('/questionnaire/:questionnaireId/comment', QuestionnaireController.getQuestionnaireComment);

// get comment
router.get('/comment', CommentController.getComment);

router.post("/submitVote",QuestionnaireController.getQuestionnaireUserSelection)

router.get("/getSurveyResults",QuestionnaireController.getQuestionnaireVoteResult)

//get setting
router.get('/setting', SettingController.getSetting);

//update setting
router.put('/setting/:id', SettingController.putSetting);

module.exports = router;