
const { MongoClient } = require('mongodb');

async function main(){

    console.log('MongoDB!');
    
    const uri = "mongodb+srv://vineethv:ZHbdpOXOJg3tj4n3@peppermintdb.7cxl4.mongodb.net/?retryWrites=true&w=majority&appName=PepperMintDB";
    const client = new MongoClient(uri);    

    try {
        await client.connect();
        console.log('MongoDB connected.!');
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }    
}

main();

async function listDatabases(client) {
    
    databasesList = await client.db().admin().listDatabases();
    console.log('Databases:');
    databasesList.databases.forEach(db => {
        console.log(` - ${db.name}`)
    });    
}