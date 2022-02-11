const express = require('express')
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors, requireAuth } = require('../../utils/validation');

const db = require('../../db/models');

const router = express.Router();

const commentValidation = [
    check('body')
        .notEmpty()
        .withMessage('Needs to have a Comment.'),
    handleValidationErrors
]

router.get('/:songId(\\d+)/comments', asyncHandler(async(req, res) => {
    const songId = req.params.songId;
    const comments = await db.Comment.findAll({
        where:{
            songId
        },
        order: [['updatedAt', 'DESC']],
        include: db.User
    })

    if(comments){
        res.json(comments);
    }

}))

router.post('/:songId(\\d+)/comments', commentValidation, asyncHandler(async(req, res, next) => {
    const {userId, body} = req.body;
    const songId = req.params.songId;
    const validatorErrors = validationResult(req);

    if(validatorErrors.isEmpty()){
        let newComment = await db.Comment.create({
            userId,
            songId,
            body
        });

        const comment = await db.Comment.findByPk(newComment.id,{
            include: db.User
        });

        res.json(comment);
    }else{
        const errors = validatorErrors.array().map((error) => error.msg);
        res.json({errors});
    }


}));

router.put('/:songId(\\d+)/comments/:commentId(\\d+)', commentValidation, asyncHandler(async(req, res, next) =>{
    const {userId, body} = req.body;
    const songId = req.params.songId;
    const commentId = req.params.commentId;

    const comment  = await db.Comment.findByPk(commentId, {
        include: [db.User]
    })

    if(comment){
        await comment.update({userId, songId, body})
        res.json(comment)
    }
}));

module.exports = router;
