#!/usr/bin/env node
const chalk = require('chalk');
const yargs = require('yargs');
let notes = require('./notes.js');

yargs.command({
  command: 'create',
  describe: 'Add a new note',
  builder: {
    title: {
      alias: 't',
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      alias: 'b',
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.createNote(argv.title, argv.body);
  }

});

yargs.command({
  command: 'remove',
  describe: 'Remove a new note',
  builder: {
    title: {
      alias: 't',
      describe: 'Title of note to be deleted',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }

});

yargs.command({
  command: 'list [title]',
  describe: 'List your notes',
  handler(argv) {
    argv.title ? notes.getNote(argv.title) : notes.listNotes();
    // notes.listNotes();
  }

}).option('title', {
  alias: 't',
  describe: 'List a singular note by passing its title',
  type: 'string'
});

yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler(){
    console.log('Note read')
  }

});

yargs.parse();