import { MongoClient } from 'mongodb';

let db;

async function connectToDb(cb) {
    const dbUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@reactfullstackwebsite.ziuid3t.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(dbUrl);
    await client.connect();

    db = client.db('react-blog-db');
    cb();
}

export {
    db,
    connectToDb,
};