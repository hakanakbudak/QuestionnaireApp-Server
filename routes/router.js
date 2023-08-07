const express = require('express');
const cors = require('cors');
const router = express();
const bodyParser = require('body-parser');

const AuthController = require('../controllers/authControllers');
const QuestionnaireController = require('../controllers/questionnaireControllers');
const SearchController = require('../controllers/searchControllers');
const CommentController = require('../controllers/commentControllers');
const SettingController = require('../controllers/settingControllers');
const JwtGetData=require('../middlewares/jwtMiddelware');

router.use(express.json());
router.options("*", cors());
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/register', AuthController.authRegister);

router.get('/getData',JwtGetData.getData)

router.put('/register/:id',AuthController.userUpdate)

router.post('/login', AuthController.authLogin);

router.get('/questionnaire', QuestionnaireController.getAllQuestionaire);

router.get('/questionnaire/:userId', QuestionnaireController.getQuestionnaire);

router.post('/questionnaire/create/:id', QuestionnaireController.addQuestionnaire);

router.put('/questionnaire/:id', QuestionnaireController.putQuestionnaire);

router.delete('/questionnaire/:id', QuestionnaireController.deleteQuestionnaire);

router.get('/search', SearchController.getAllSearch);

router.post('/questionnaire/comment/:userId/:id', CommentController.createComment);

router.get('/questionnaire/:questionnaireId/comment', QuestionnaireController.getQuestionnaireComment);

router.get('/comment', CommentController.getComment);

router.delete('/questionnaire/comment/:id', CommentController.deleteComment);

router.put('/questionnaire/comment/:id', CommentController.editComment)

router.post("/submitVote", QuestionnaireController.getQuestionnaireUserSelection)

router.get("/getSurveyResults", QuestionnaireController.getQuestionnaireVoteResult)

router.get('/setting/:id', SettingController.getSetting);

router.put('/setting/:id', SettingController.putSetting);

module.exports = router;