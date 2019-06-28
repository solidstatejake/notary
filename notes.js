const chalk = require('chalk');
const fs = require('fs');

const log = console.log;
const failed = chalk.bgRed.bold("Failed");
const created = chalk.green.bold("Created");
const removed = chalk.red.bold("Removed");
const colorTitle = (title) => chalk.cyan(title);
const colorCode = (code) => chalk.magenta(code);


const createNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {

    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    log(`${created} note with the title ${colorTitle(title)}.`);

  } else {
    log(`${failed} to create note. A note already exists with the title ${colorTitle(title)}.`);
  }

};

const removeNote = (title) => {
  const notes = loadNotes();
  if (notes.some(note => note.title === title)) {
    const filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);
    log(`${removed} note with the title ${colorTitle(title)}.`);

  } else {
    log(`${failed} to remove note. No note exists with the title ${colorTitle(title)}.`);
  }
};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length > 0) {
    notes.forEach((note) => {
      if(note.index === 0) log('_______________________________________________________________________________');
      log(`# : ${note.index}`);
      log(`Title: ${colorTitle(note.title)}`);
      log(`Body: ${note.body}`);
      log('_______________________________________________________________________________')
    });
  } else {
    log(`You have no notes. Call ${colorCode("node [filename.js] create" +
        " -t='[title]' -b='[body]'")} to create a new note.`)
  }
};

const getNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note, idx) =>  note.title === title);
  if(note) {
    log('_______________________________________________________________________________');
    log(`# : ${note.index}`);
    log(`Title: ${colorTitle(note.title)}`);
    log(`Body: ${note.body}`);
    log('_______________________________________________________________________________');
  } else
  {
    log(`Note with title ${colorTitle(title)} does not exist. Call ${colorCode("node" +
      " [filename.js] create -t='[title]' -b='[body]'")} to create a new note.`)
  }
};

const saveNotes = (notes) => {
  notes = notes.map((note,index ) => note = {...note, index: index});
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }

};

module.exports = {
  createNote,
  removeNote,
  listNotes,
  getNote,
};