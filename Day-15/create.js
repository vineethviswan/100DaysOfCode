
const { MongoClient } = require('mongodb');

async function main() {

    const uri = "ConnectionString";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('MongoDB connected.!');
        await CreateMovie(client, "New Indian Movie X");

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function CreateMovie(client, movieName) {    
    const result = await client.db("sample_mflix:").collection("movies").insertOne({ 
        title: movieName,
        year: 2021, 
        plot: "A new movie plot",
        poster: "https://www.google.com",   
        runtime: 120,
        cast: ["Actor 1", "Actor 2"],
        director: "Director 1",
        genre: ["Action", "Drama"],
        released: true, 
        rated: "PG-13",
        languages: ["English", "Hindi"],
        country: "India"
    });
    if (result) {
        console.log(`New movie created with the following id: ${result.insertedId}`);
    } else {
        console.log('Error creating movie');
    }
}