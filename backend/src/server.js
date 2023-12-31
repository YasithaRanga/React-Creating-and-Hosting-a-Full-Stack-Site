import fs from 'fs';
import path from 'path';
import admin from 'firebase-admin';
import express from 'express';
import { db, connectToDb } from './db.js';
import cors from 'cors';
import 'dotenv/config';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);

admin.initializeApp({
    credential: admin.credential.cert(credentials),
})

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, '../build')));

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;

    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (e) {
            return res.sendStatus(400);
        }
    }

    req.user = req.user || {};

    next();
});

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.includes(uid);
        res.status(200).json(article);
    } else {
        res.status(400).json({ error: "Article does not exist" })
    }

});

app.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.includes(uid);

        if (canUpvote) {
            await db.collection('articles').updateOne({ name }, {
                $inc: {
                    upvotes: 1,
                },
                $push: {
                    upvoteIds: uid
                }
            });
        }

        const updatedArticle = await db.collection('articles').findOne({ name });
        res.status(200).json(updatedArticle);
    } else {
        res.status(400).json({ error: 'Article does not exist' });
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { text } = req.body;
    const { name } = req.params;
    const { email } = req.user;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy: email, text } },
    })

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.status(200).json(article);
    } else {
        res.status(400).json({ error: 'Article does not exist' });
    }
});

const PORT = process.env.PORT || 9000;

connectToDb(() => {
    console.log('Successfully connected to database');
    app.listen(PORT, () => {
        console.log('Server is running on port: ' + PORT);
    });
})