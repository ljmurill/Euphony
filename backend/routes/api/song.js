const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const db = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
    const song = await db.Song.findAll({
        include: [db.User]
    });
    console.log(song)
    if(song){
        res.json({song});
    }
}));

module.exports = router;
