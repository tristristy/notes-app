const express = require('express')
const port = process.env.PORT || 3001;
const app = express()
const { notes } = require('./db/db');
const fs = require('fs');
const path = require('path')

function createNewNote(body, notesArray) {
    console.log(body);
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
      );
    
    // return finished code 
    return note;
  }