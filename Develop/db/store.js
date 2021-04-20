const util = require("util");
const fs = require("fs");
const uuidv1 = require("uuid/v1");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// created a class to store the notes and to remove the notes
class Store {
  // reads the notes on data base JSON
  read() {
    return readFileAsync("db/db.json", "utf8");
  }
  // writes the file asynchronous and stringify the note to the JSON
  write() {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }
  // returns the read notes and parses them and catches the error
  getNotes() {
    return this.read().then((notes) => {
      let parseNotes;
      try {
        parseNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parseNotes = [];
      }

      return parseNotes;
    });
  }
  // adds notes also throws error message if the title or text is blank
  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note title or text can't be blank");
    }

    const newNote = { title, text, id: uuidv1() };

    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }
  // removes notes from the filter
  removeNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filterNotes) => this.write(filterNotes));
  }
}

module.exports = new Store();
