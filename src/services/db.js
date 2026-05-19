import { MongoClient, ServerApiVersion } from 'mongodb';
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mrartimas24_db_user:oj2xYUeZ024FFAqs@cluster0.azkbrrc.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function run() {
    try {
        await client.connect();
        console.log("connect done")
    } catch (error) {
        console.error(error);
    }
}

