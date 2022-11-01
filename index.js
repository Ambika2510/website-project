const express = require('express');
const Blog = require('./models/blog.js');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

// const dotenv = require('dotenv')
// dotenv.config();
const dbURI = 'mongodb+srv://Ambika:Ambika1234@cluster0.m6vw5f9.mongodb.net/node?retryWrites=true&w=majority';
const port = 4500 || process.env.PORT;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => { app.listen(port) })
    .catch((e) => console.log(e));


app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.urlencoded());

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: "new blog 2",
//         snippet: "about my new blog",
//         body: "more about my new blog"
//     });
//     blog.save()
//         .then((result) => console.log(result))
//         .catch((err) => {
//             console.log(err)
//         });
//     res.send('okk');

// });
app.get('/blog/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' })
        })
        .catch(err => {
            console.log(err);
        });
})
app.delete('/blog/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/' });
        })
        .catch(err => {
            console.log(err);
        })
})
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/')
        })

    .catch((e) => {
        console.log('error in post..')
    });
});

app.get('/', (req, res) => {
    Blog.find()
        .then((result) => {
            res.render('app', { title: 'home', blogs: result })
        })

    .catch((e) => {
        console.log('error in getting data..')
    });
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new news' });
})
app.use((req, res) => {
        res.status(404).render('404', { title: 'Doesnot exist page' });
    })
    // app.listen('4500', () => { console.log('server running..') });