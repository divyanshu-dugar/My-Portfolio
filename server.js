const express = require('express');
const path = require('path');
const fs = require('fs');
// const notesData = require('./data/notes.json');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true })); // For parsing form data

const PORT = process.env.PORT || 8080;

// File Read
const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'notes.json'), 'utf8'));

// blogs.ejs page
const blogCards = JSON.parse(fs.readFileSync(path.join(__dirname, "data", 'blogs', "blogs-cards.json"), "utf8"));
const webdevelopment = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'blogs', 'blogs-web-dev.json'), 'utf-8'));
const blogsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'blogs', 'blogs-definitions.json'), 'utf-8'));

// projects.ejs page
let projects = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'projects', 'projects-project-name.json')));
let blogs = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'projects', 'projects-blogs-data.json'), 'utf-8'));


// Routes
app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/blogs',(req,res) => {
    res.render('blogs', {blogs: blogCards})
})

app.get('/contact', (req, res) =>{
    res.render('contact');
})

app.get('/notes', (req, res) => {
  res.render('notes', { notes: notesData.notes });
});

app.get('/projects', (req, res) => {
    res.render('projects', {projects});
})

app.get('/projects/:id', (req, res) => {
    let id = req.params.id;
    let project = projects.find((project) => project.id === id)

    if(id === "1"){
        res.render('project1',{project});
    }else if(id === "2"){
        res.render('project2',{project,blogs});
    }
})

// REST API - BLOGS
app.get('/project2/blogs/add', (req, res) => {
    res.render('add');
})

app.post('/project2/blogs/add', (req, res) => {
    let {name, content} = req.body;
    let newBlog = {name, content};
    console.log(newBlog);

    
})

app.get('/project2/blogs/:id', (req, res) => {
    let id = req.params.id;

    // Ensure type compatibility between id and blog.id
    let blog = blogs.find((blog) => blog.id === id);

    if (!blog) {
        return res.status(404).send("Blog not found");
    }

    res.render("show", { blog });
});

app.get('/web-dev', (req, res)=>{
    res.render("web-dev", {webdevelopment});
})

app.get('/definitions', (req, res) => {
    res.render('definitions', { blogs: blogsData });
})

// AJAX - API
app.get('/api/data', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'projects', 'projects-harry-potter.json'), 'utf8', (err, data) => {
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
