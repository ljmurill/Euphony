const express = require('express')
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
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



router.post('/create', songValidation, asyncHandler(async(req, res, next) => {
    const {userId, title, url, imageUrl} = req.body;
    const User = await db.User.findByPk(userId);
    const validatorErrors = validationResult(req);

    if(validatorErrors.isEmpty()){
        const newSong = await db.Song.create({
            userId,
            title,
            url,
            imageUrl
        });

        newSong.User = User;
        res.json({newSong});
    }else{
        const errors = validatorErrors.array().map((error) => error.msg);
        res.json({errors});
    }


}));

module.exports = router;
