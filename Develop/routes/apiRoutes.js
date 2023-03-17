const router = require("express").Router()
const store = require('../db/store')

router.get("/notes", (req, res) => {
    console.log("Hello");
    store.getNotes()
    .then((notes) => {
        return res.json(notes)
    }).catch((err) => res.status(500).json(err))
})
module.exports = router