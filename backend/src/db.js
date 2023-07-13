import { MongoClient } from 'mongodb';

let db;

async function connectToDb(cb) {
    const dbUrl = 'mongodb://127.0.0.1:27017';

    const client = new MongoClient(dbUrl);
    await client.connect();

    db = client.db('react-blog-db');
    cb();
}

export {
    db,
    connectToDb,
};