const express = require('express');
const path = require('path');
const fs = require('fs');
// const notesData = require('./data/notes.json');
const methodOverride = require('method-override');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true })); // For parsing form data
// override with POST having ?_method=DELETE / PATCH / PUT
app.use(methodOverride('_method'))

const PORT = process.env.PORT || 8080;

// File Read
const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'notes.json'), 'utf8'));

// blogs.ejs page
const blogCards = JSON.parse(fs.readFileSync(path.join(__dirname, "data", 'blogs', "blogs-cards.json"), "utf8"));
const webdevelopment = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'blogs', 'blogs-web-dev.json'), 'utf-8'));
const blogsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'blogs', 'blogs-definitions.json'), 'utf-8'));
const dsa = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'blogs', 'blogs-dsa.json'),'utf8'));

// projects.ejs page
let projects = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'projects', 'projects-project-name.json')));
let blogs = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'projects', 'projects-blogs-data.json'), 'utf-8'));
let harryPotterData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'projects', 'projects-harry-potter.json'), 'utf-8'));

//
// --------------------------------------------------------------------
//

// Routes
app.get('/',(req,res)=>{
    res.render('index');
})

//
// --------------------------------------------------------------------
//

app.get('/contact', (req, res) =>{
    res.render('contact');
})

//
// --------------------------------------------------------------------
//

app.get('/notes', (req, res) => {
  res.render('notes', { notes: notesData.notes });
});

//
// --------------------------------------------------------------------
//

// --------------------
// PROJECTS PAGE
// --------------------

app.get('/projects', (req, res) => {
    res.render('projects', {projects});
})

// PROJECT  1 - AJAX (JSON)
app.get('/projects/1', (req, res) =>{
    let project = projects[0];
    res.render('project1', {project, harryPotterData});
})

// PROJECT 2 - (REST API - BLOGS)
app.get('/projects/2', (req, res) =>{
    let project = projects[1];
    res.render('project2', {project, blogs});
})

// --------------------
// C - ADDING NEW BLOGS
// --------------------

app.get('/project2/blogs/add', (req, res) => {
    res.render('./project2/add');
})

app.post('/project2/blogs/add', (req, res) => {
    let {name, content} = req.body;
    // Generate a new unique ID based on existing blogs
    let newId = (parseInt(blogs.length) + 1).toString();

    // Create a new blog object
    let newBlog = { id: newId, name, content };

    // Add the new blog to the blogs array
    blogs.push(newBlog);

    // Write the updated blogs array to the correct JSON file
    const filePath = path.join(__dirname, 'data', 'projects', 'projects-blogs-data.json');
    fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2), 'utf-8');

    res.redirect('/projects/2')
})

// --------------------------
// R - FETCHING A REQUESTED BLOG
// --------------------------
app.get('/project2/blogs/:id', (req, res) => {
    let id = req.params.id;
    let blog = blogs.find((blog) => blog.id === id);

    if (!blog) {
        return res.status(404).send("Blog not found");
    }
    res.render("./project2/show", { blog });
});

// --------------------------
// U - UPDATING A REQUESTED BLOG
// --------------------------

app.get('/project2/blogs/:id/update',(req, res)=>{
    let id = req.params.id;
    let blog = blogs.find((blog) => blog.id === id);

    res.render('./project2/update',{blog});
});

app.patch('/project2/:id', (req, res) => {
    let id = req.params.id;
    let {name, content} = req.body;

    let blog = blogs.find((blog) => blog.id === id);
    blog.name = name;
    blog.content = content;

    blogs[id - 1] = blog;

    const filePath = path.join(__dirname, 'data', 'projects', 'projects-blogs-data.json');
    fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2), 'utf-8');

    res.redirect('/projects/2');
})

// --------------------------
// D - DELETING THE BLOG
// --------------------------
app.delete('/project2/blogs/:id', (req, res) => {
    let id = req.params.id;

    blogs = blogs.filter((blog) => blog.id !== id);

    const filePath = path.join(__dirname, 'data', 'projects', 'projects-blogs-data.json');
    fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2), 'utf-8');

    res.redirect('/projects/2');
})

// Calling the requested project

app.get('/projects/:id', (req, res) => {
    let id = req.params.id;
    
    if(id === "1"){
        res.redirect(`/project/${id}`)
    }else if(id === "2"){
        res.redirect(`/project/${id}`);
    }
})

// --------------------------------------------------------------------
//

// --------------------
// BLOGS PAGE
// --------------------

app.get('/blogs',(req,res) => {
    res.render('blogs', {blogs: blogCards})
})

app.get('/web-dev', (req, res)=>{
    res.render("web-dev", {webdevelopment});
})

app.get('/definitions', (req, res) => {
    res.render('definitions', { blogs: blogsData });
})

app.get('/dsa',(req, res) => {
    res.render('dsa', {dsa: dsa});
})

// --------------------------------------------------------------------
//

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
