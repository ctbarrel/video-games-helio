const express = require('express')
const router = express.Router()

const db = require('../../db/mongo')

router.get('/', function (req, res, next) {
    const info = {
        query: {},
        collection: req.app.locals.collectionVideoGames
    }
    db.readAll(info)
    .then(videoGames => {
        res.json(videoGames)
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router