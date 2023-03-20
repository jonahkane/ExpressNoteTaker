const router = require("express").Router()
const store = require('../db/store')

router.get("/notes", (req, res) => {
    // console.log("test");
    store.getNotes()
    .then((notes) => {
        return res.json(notes)
    }).catch((err) => res.status(500).json(err))
})
router.post("/notes", (req, res) => {
    console.log("New note added successfully!");
    store.addNote(req.body)
    .then((note) => res.json(note)).catch((err) => res.status(500).json(err))    
})
router.delete("/notes/:noteId", (req, res) => {
    console.log("Note deleted successfull!");
    store.deleteNote(req.params.noteId)
    .then((note) => res.json(note)).catch((err) => res.status(500).json(err))     
})
// router.put (update) notes.noteId

module.exports = router