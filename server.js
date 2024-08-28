const express = require('express');
const path = require('path')

const app = express();

app.set('views', path)
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));

const PORT = process.env.PORT || 8080;

// Routes

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/blogs',(req,res) => {
    res.render('blogs');
})

app.get('/contact', (req, res) =>{
    res.render('contact');
})

app.get('/notes', (req,res) => {
    res.render('notes');
})

app.get('/projects', (req, res) => {
    res.render('projects');
})

app.listen(PORT,()=>{
    console.log(`App Listening on port ${PORT}`)
});