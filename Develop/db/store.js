const util = require('util')
const fs = require('fs')
const uuidv1 = require('uuid/v1')

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)
class Store {
    read() {
        return readFileAsync("db/db.json", "utf-8") 
    } 
    write(note){
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getNotes() {
        return this.read()
        .then((notes) => {
            let parsedNotes
            try {
                parsedNotes = [].concat(JSON.parse(notes))
            } catch (error) {
                parsedNotes = []
            }
            return parsedNotes
        });
    }
    addNote(note) {
        const {title, text} = note
        const newNote = {title, text, id: uuidv1()}
        return this.getNotes().then((notes) => [...notes, newNote]).then((freshNote)=> this.write(freshNote)).then(()=> newNote)
    }
    deleteNote(noteId) {
        return this.getNotes().then((notes) => notes.filter(note => note.id != noteId)).then((freshNote)=> this.write(freshNote)).then(()=> newNote)

    }
}
module.exports = new Store()