const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOption = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
}
const bodyOption = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
}

const argv = yargs.command('add', 'Add a new note', {
  title: titleOption,
  body: bodyOption
})
.command('list', 'List all notes')
.command('read', 'Read a note', {
  title: titleOption
})
.help()
.argv;
var command = argv._[0];

if(command === 'add') {
  var note = notes.addNote(argv.title, argv.body);

  if(note) {
    console.log('Note successfully added.');
    notes.logNote(note);
  } else {
    console.log('Oh, Something went wrong!');
  }

} else if(command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach((note) => notes.logNote(note));
} else if(command === 'read') {
  var note = notes.getNote(argv.title);
  
  if(note) {
    console.log('Here is your note');
    notes.logNote(note);
  } else {
    console.log('Note does not exist');
  }

} else if(command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Something went wrong';
  console.log(message);
} else {
  console.log('Command not recognized');
}