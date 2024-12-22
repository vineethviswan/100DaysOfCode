/*--------------------------------------------------------------------------------------
    Day 15 - Perform CRUD operations using MongoDB and the mongodb Nodejs driver             
----------------------------------------------------------------------------------------*/

const { MongoClient } = require('mongodb');

async function main() {

    const uri = "ConnectionString";
    const client = new MongoClient(uri);    

    try {
        await client.connect();
        console.log('MongoDB connected.!');
        await findOneMovieByName(client, "New Indian Movie X");

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }    

}

main().catch(console.error);

async function findOneMovieByName(client, movieName) {

    const result = await client.db("sample_mflix:").collection("movies").findOne({title: movieName});
    if(result) {
        console.log(`Found a movie name : ${result.poster} and id : ${result._id}`);
    } else {
        console.log(`No movies found with name : ${movieName}`);
    }
}
