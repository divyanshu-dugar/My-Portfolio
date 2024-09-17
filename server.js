const express = require('express');
const path = require('path');
const fs = require('fs');
// const notesData = require('./data/notes.json');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));

const PORT = process.env.PORT || 8080;

// Routes

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/blogs',(req,res) => {
    const blogsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'blogs.json'), 'utf-8'));
    res.render('blogs', { blogs: blogsData });
})

app.get('/contact', (req, res) =>{
    res.render('contact');
})

app.get('/notes', (req, res) => {
  const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'notes.json'), 'utf8'));
  res.render('notes', { notes: notesData.notes });
});

app.get('/projects', (req, res) => {
    res.render('projects');
})

app.listen(PORT,()=>{
    console.log(`App Listening on port ${PORT}`)
});