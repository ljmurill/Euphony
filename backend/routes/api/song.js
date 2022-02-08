const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const db = require('../../db/models');

const router = express.Router();

const songValidation = [
    check('title')
        .notEmpty()
        .withMessage('Needs to have a Title.'),
    check('url')
        .notEmpty()
        .withMessage('Needs to have a valid mp3 file.'),
    handleValidationErrors
]

router.get('/', asyncHandler(async(req, res) => {
    const song = await db.Song.findAll({
        include: [db.User]
    });

    if(song){
        res.json(song);
    }
}));

router.post('/create', songValidation, asyncHandler(async(req, res) => {
    const {userId, title, url, imageUrl} = req.body;

    const newSong = await db.Song.create({
        userId,
        title,
        url,
        imageUrl
    });

    res.json(newSong);

}));

module.exports = router;
