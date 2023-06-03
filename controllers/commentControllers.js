const UserComment = require('../models/UserComment');

exports.addComment=async (req, res, next) => {

    try {
        const comment = req.body
        const createdComment = await UserComment.create(comment)

        res.status(201).json(createdComment)
        next()
    } catch (error) {
        console.log(error)
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