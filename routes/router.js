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


// *****
router.get('/getData', (req, res) => {

    try {
        const token = req.headers.authorization;
        const secretKey = "MoHmggQ8ZyCb";
        const verified = jwt.verify(token, secretKey);
        if (verified) {

            res.send('anket32')
        } else {
            res.send('Invalid Token!')
        }
    } catch (e) {
        return res.send('Invalid Token!');
    }

})

// *****
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

// add questionnaire
router.post('/questionnaire', QuestionnaireController.addQuestionnaire);

// get all questionnaire 
//router.get('/questionnaire', QuestionnaireController.getAllQuestionaire);

// get questionnaire
router.get('/questionnaire/:id', QuestionnaireController.getQuestionnaire);

// questionnaire search
router.get('/search', SearchController.getAllSearch);

// update questionnaire
router.put('/questionnaire/:id', QuestionnaireController.putQuestionnaire);

// questionnaire delete
router.delete('/questionnaire/:id', QuestionnaireController.deleteQuestionnaire);

// add comment 
router.post('/comment', CommentController.addComment);

// get comment
router.get('/comment', CommentController.getComment);

//get setting
router.get('/setting', SettingController.getSetting);

//update setting
router.put('/setting/:id', SettingController.putSetting);


module.exports = router;