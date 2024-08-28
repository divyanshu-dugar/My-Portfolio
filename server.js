const express = require('express');
const path = require('path')

const app = express();

app.set('views', path)
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));

const PORT = process.env.PORT || 8080;