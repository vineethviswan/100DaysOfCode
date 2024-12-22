
const { MongoClient } = require('mongodb');

async function main() {    
    
    const uri = "ConnectionString";
    const client = new MongoClient(uri)    

    try {
        await client.connect();
        console.log('MongoDB connected.!');
        await UpdateMovie(client, "New Indian Movie X", "Indian 2025");
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function UpdateMovie(client, movieName, updatedMovieName) {
    const result = await client.db("sample_mflix:").collection("movies").updateOne(
        { title: movieName }, { $set: { title: updatedMovieName } });
    if (result) {
        console.log(`Movie updated with the following id: ${result.insertedId}`);
    } else {
        console.log('Error updating movie');
    }
}

