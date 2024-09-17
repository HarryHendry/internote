const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;

let posts = [ {
    id: 1,
    title: 'Hello welcome to internote',
    content: 'This app allows you to take notes in the browser, edit the notes and delete them.',
    date: new Date().toLocaleDateString()
},
{
    id: 2,
    title: 'Add the title of your notes here.',
    content: 'Then add what ever notes you want here.',
    date: new Date().toLocaleDateString()
}]; // Temporary storage for posts

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route to view all posts
app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

// Route to create a new post
app.post('/create', (req, res) => {
    const { title, content } = req.body;
    const newPost = {
        id: posts.length + 1,
        title: title,
        content: content,
        date: new Date().toLocaleDateString()
    };
    posts.push(newPost);
    res.redirect('/');
});

// Route to edit a post
app.get('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.render('edit', { post: post });
    } else {
        res.redirect('/');
    }
});

// Route to update a post
app.post('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.title = req.body.title;
        post.content = req.body.content;
    }
    res.redirect('/');
});

// Route to delete a post
app.post('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== postId);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
