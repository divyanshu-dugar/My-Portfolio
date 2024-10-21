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
    const blogCards = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "blogs-cards.json"), "utf8"));
    res.render('blogs', {blogs: blogCards})
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

app.get('/web-dev', (req, res)=>{
    res.send("20th October, 2024 - Today I learned about AJAX, 21st - Promises (resolve - then, reject - catch)");
})

app.get('/definitions', (req, res) => {
    const blogsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'blogs-definitions.json'), 'utf-8'));
    res.render('definitions', { blogs: blogsData });
})

// API
app.get('/api/data', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'harry-potter.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to read data" }); // Send error response
        }
        res.json(JSON.parse(data));
    });
});


app.listen(PORT,()=>{
    console.log(`App Listening on port ${PORT}`)
});
