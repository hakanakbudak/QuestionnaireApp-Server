const Questionnaires = require('../models/Questionnaires');

exports.getAllSearch=async (req, res) => {
    try {
        const { searchQuery } = req.query;
        const searchResults = await Questionnaires.find({
            $or: [
                { selectionOne: { $regex: searchQuery, $options: 'i' } },
                { selectionTwo: { $regex: searchQuery, $options: 'i' } },
                { selectionThree: { $regex: searchQuery, $options: 'i' } },
                { question: { $regex: searchQuery, $options: 'i' } },
                { category: { $regex: searchQuery, $options: 'i' } }
            ]
        });

        if (!searchResults) {
            return res.status(404).json({ error: 'kelime bulunamadı' });
        }
        res.json(searchResults);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'SONUÇ BULUNAMADI' });
    }
};