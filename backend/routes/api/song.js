const express = require('express')
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {setTokenCookie} = require('../../utils/auth')
const {multipleMulterUpload, multiplePublicFileUpload, singlePublicFileUpload ,singleMulterUploadImage, singleMulterUploadSong} = require('../../awsS3')
const db = require('../../db/models');


const router = express.Router();

const songValidation = [
    check('title')
        .notEmpty()
        .withMessage('Needs to have a Title.'),
    // handleValidationErrors
]

// const fileValidator = (req, res, next) => {

//     const expectedSongType = ['mp3']
//     if (!req.files){
//         return res.json({errors: ['Must have a mp3 file.']})
//     }
//     next()
//     // for (file in req.files){
//     //     if(file.mimetype.split('/').pop())
//     //     if (!file.mimetype.split('/').pop().includes(expectedSongType)){
//     //         res.json({errors: ['Must have a mp3 file.']})
//     //     }
//     // }
// }

router.get('/', asyncHandler(async(req, res) => {
    const song = await db.Song.findAll({
        include: [db.User],
        order: [['updatedAt', 'DESC']]
    });

    if(song){
        res.json(song);
    }
}));

router.get('/:userId(\\d+)' , asyncHandler(async(req, res) => {
    const userId = req.params.userId;
    const songs = await db.Song.findAll({
        where: {
            userId
        },
        include: [db.User]
    })

    if(songs){
        res.json(songs)
    }
}))


router.post('/create', multipleMulterUpload('urls'), songValidation, asyncHandler(async(req, res, next) => {
    const {userId, title} = req.body;
    const files = await multiplePublicFileUpload(req.files)
    const validatorErrors = validationResult(req);
    if(validatorErrors.isEmpty() && req.files.length > 0){
        // console.log('hello =======================')
        if(files.length === 1 && files[0].endsWith('mp3')){
            // console.log(files[0])
            let newSong = await db.Song.create({
                userId,
                title,
                url: files[0],
                imageUrl: null
            });
            const song = await db.Song.findByPk(newSong.id,{
                include: db.User
            });
            res.json(song);
        }else if(files.length === 2 && files[1].endsWith('mp3') && (files[0].endsWith('jpg') || files[0].endsWith('jpeg') || files[0].endsWith('gif') || files[0].endsWith('png'))){
            let newSong = await db.Song.create({
                userId,
                title,
                url: files[1],
                imageUrl: files[0]
            });
            const song = await db.Song.findByPk(newSong.id,{
                include: db.User
            });
            res.json(song);
        }
    }if(validatorErrors.isEmpty() && req.files.length === 1){
        const errors = validatorErrors.array().map((error) => error.msg);

        const err = new Error('Bad request.');
        err.errors = [...errors, 'Song must be a valid mp3 file.', 'Image must be a valid png, jpg, jpeg, or gif file.'];
        err.status = 400;
        err.title = 'Bad request.';
        next(err)

        // console.log('wasiup ++++++')

    }else{
        console.log('hellllo')
        const errors = validatorErrors.array().map((error) => error.msg);
        const err = new Error('Bad request.');
        err.errors = [...errors, 'Must have valid mp3 file.', 'Image must be a valid png, jpg, jpeg, or gif file.'];
        err.status = 400;
        err.title = 'Bad request.';
        next(err)

    }
    // const err = Error('Bad request.');
}));



router.put('/:songId(\\d+)', singleMulterUploadImage('image'), songValidation, asyncHandler(async(req, res, next) => {
    const {userId, title, url} = req.body;
    let file;
    let imageUrl;

    if(req.file){
        file = await singlePublicFileUpload(req.file)
    }else{
        imageUrl = req.body.image;
    }

    const validatorErrors = validationResult(req);
    const specificSong = await db.Song.findByPk(req.params.songId, {
        include: db.User
    });

    if(validatorErrors.isEmpty() && specificSong && !file){
        console.log('part1++++++++++')
        await specificSong.update({userId, title, url, imageUrl});
        res.json({ specificSong })
    }if(validatorErrors.isEmpty() && (file.endsWith('jpg') || file.endsWith('jpeg') || file.endsWith('gif') || file.endsWith('png'))){
        console.log('part2++++++++++')
        await specificSong.update({
                userId,
                title,
                url,
                imageUrl: file,
            })
            res.json({ specificSong })
    }else{
        console.log('part3++++++++++')
        const errors = validatorErrors.array().map((error) => error.msg);

        const err = new Error('Bad request.');
        err.errors = [...errors];
        err.status = 400;
        err.title = 'Bad request.';
        next(err)
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
