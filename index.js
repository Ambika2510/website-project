const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blog.js');
const dotenv = require("dotenv");
dotenv.config();

app.listen('3000', () => { console.log('server running..') });
mongoose.connect(
        process.env.dbURI,
        () => (console.log('database connected succesfully..'))
    )
    .then(() => console.log('connected'))
    .catch(e => console.log(e));


app.use(express.static('public'));
app.set('view engine', 'ejs');
// app.use((req, res, next) => {
//     console.log("ambika");
//     next();
// })
app.get('/add-blog', (req, res) => {

    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });
    blog.save()
        .then((result) => res.send(result))
        .catch(e => console.log(e));
})
app.get('/', (req, res) => {
    const blogs = [
        { title: 'yoshi find eggs', snippet: 'lorkvfdj jbfvub ' }
    ]
    res.render('app', {
        title: 'Home',
        blogs
    });
})
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
})
app.use((req, res) => {
    res.status(404).render('404', { title: 'Doesnot exist page' });
})