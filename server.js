const express = require('express')
const port = process.env.PORT || 3001;
const app = express()
const { notes } = require('./db/db');
const fs = require('fs');
const path = require('path')


app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));


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
  app.get('/api/notes', (req, res) => {
    let results = notes;
    console.log(req.query)
    res.json(results);
  });



app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  // add notes to json file and notes array in this function
  const note = createNewNote(req.body, notes);
    
    res.json(note);
  });
  app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    let note;

    notes.map((element, index) => {
      if (element.id == id){
        note = element
        notes.splice(index, 1)
        return res.json(note);
      } 
    
    })
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
