import express from 'express';
import { db, connectToDb } from './db.js';

const app = express();
app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.status(200).json(article);
    } else {
        res.status(400).json({ error: "Article does not exist" })
    }

});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;

    await db.collection('articles').updateOne({ name }, {
        $inc: {
            upvotes: 1,
        }
    });

    const article = await db.collection('articles').findOne({ name });
    if (article) {
        res.status(200).json({ success: 'Updated article upvotes successfully', upvotes: article.upvotes, name: article.name });
    } else {
        res.status(400).json({ error: 'Article does not exist' });
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { postedBy, text } = req.body;
    const { name } = req.params;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text } },
    })

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.status(200).json({ success: 'Comment added successfully', comments: article.comments, name: article.name });
    } else {
        res.status(400).json({ error: 'Article does not exist' });
    }
});

connectToDb(() => {
    console.log('Successfully connected to database');
    app.listen(9000, () => {
        console.log('Server is running on port: 9000');
    });
})