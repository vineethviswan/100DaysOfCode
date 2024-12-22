
const { MongoClient } = require('mongodb');

async function main() {    
    
    const uri = "ConnectionString";
    const client = new MongoClient(uri)    

    try {
        await client.connect();
        console.log('MongoDB connected.!');
        await DeleteMovie(client, "Indian 2025");
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function DeleteMovie(client, movieName) {
    const result = await client.db("sample_mflix:").collection("movies").deleteOne({
        title: movieName
    });
    if (result) {
        console.log(`${result.deletedCount} document(s) was/were deleted.`);
    } else {
        console.log('Error deleting movie');
    }
}
