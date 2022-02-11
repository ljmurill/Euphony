const express = require('express')
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors, requireAuth } = require('../../utils/validation');

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
        include: [db.User],
        order: [['updatedAt', 'DESC']]
    });

    if(song){
        res.json(song);
    }
}));



router.post('/create', songValidation, asyncHandler(async(req, res, next) => {
    const {userId, title, url, imageUrl} = req.body;
    const validatorErrors = validationResult(req);

    if(validatorErrors.isEmpty()){
        let newSong = await db.Song.create({
            userId,
            title,
            url,
            imageUrl
        });

       const song = await db.Song.findByPk(newSong.id,{
           include: db.User
       });

        res.json(song);
    }else{
        const errors = validatorErrors.array().map((error) => error.msg);
        res.json({errors});
    }


}));



router.put('/:songId(\\d+)', songValidation, asyncHandler(async(req, res, next) => {
    const {userId, title, url, imageUrl} = req.body;
    const specificSong = await db.Song.findByPk(req.params.songId, {
        include: db.User
    });
    console.log('YELLow', specificSong)
    if(specificSong){
        await specificSong.update({userId, title, url, imageUrl});
        res.json({ specificSong })
    }
}));


router.delete('/:songId(\\d+)', asyncHandler(async(req, res, next) => {
    const songId = req.params.songId;
    const song = await db.Song.findByPk(songId);
    const comments = await db.Comment.findAll({
        where:{
            songId
        }
    })

    if(song){
        comments.forEach(async(comment) => {
            await comment.destroy();
        });
        await song.destroy();
        res.json({message: 'Success'});
    }
}));


module.exports = router;
