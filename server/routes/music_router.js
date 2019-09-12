const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');


router.get('/', (req, res) => {
    // res.send(musicLibrary);
    let queryText = `SELECT * FROM "songs";`;
    pool.query(queryText)
    .then((result) => {
        // console.log('results', result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error making query', error);
        res.sendStatus(500);
    })
});

router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    res.sendStatus(200);
    // res.send(musicLibrary);
    let queryText = `DELETE FROM "songs" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
    .then((result) => {
        // console.log('results', result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error making query', error);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    console.log("HELLO FROM THE POST", req.body);
    const newSong = req.body;
    const queryText = `INSERT INTO "songs" ("artist", "track", "rank", "published")
    VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [newSong.artist, newSong.track, newSong.rank, newSong.published])
    .then((result) => {
        console.log('result', result);
        res.sendStatus(200);
    }) 
    .catch((error) => {
        console.log(`error making query ${queryText}`, error);
        res.sendStatus(500);
    })
})

module.exports = router;