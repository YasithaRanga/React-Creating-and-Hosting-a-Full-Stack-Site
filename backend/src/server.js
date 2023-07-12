import express from 'express';

let articlesInfo = [
    {
        name: 'learn-react',
        upvotes: 0,
        comments: [],
    },
    {
        name: 'learn-node',
        upvotes: 0,
        comments: [],
    },
    {
        name: 'mongodb',
        upvotes: 0,
        comments: [],
    }
]

const app = express();
app.use(express.json());

app.put('/api/articles/:name/upvote', (req, res) => {
    const { name } = req.params;
    const article = articlesInfo.find(article => article.name === name);
    if (article) {
        article.upvotes++;
        res.status(200).json({ success: 'Updated article upvotes successfully', upvotes: article.upvotes, name: article.name });
    } else {
        res.status(400).json({ error: 'Article does not exist' });
    }
});

app.post('/api/articles/:name/comments', (req, res) => {
    const { postedBy, text } = req.body;
    const { name } = req.params;
    const article = articlesInfo.find(article => article.name === name);

    if (article) {
        article.comments.push({
            postedBy,
            text,
        });
        res.status(200).json({ success: 'Comment added successfully', comments: article.comments, name: article.name });
    } else {
        res.status(400).json({ error: 'Article does not exist' });
    }
});

app.listen(9000, () => {
    console.log('Server is running on port: 9000');
});