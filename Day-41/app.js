
/*------------------------------------------------------------------------
    Day 41 - Data Seeding in MongoDB
             Create a script to seed initial data in MongoDB
-------------------------------------------------------------------------*/

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String, 
    createdAt: {
        type: Date,
        default: Date.now
    }   
});

const User = mongoose.model('User', userSchema);

// Sample data
const userData = [
    { name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { name: 'Alice Johnson', email: 'alice@example.com', role: 'user' }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
    
// Seed function
const seedDatabase = async () => {

    try {

        //Clear existing data
        await User.deleteMany({}); // Clear existing data
        console.log('Existing data cleared');

        // Insert new data
        await User.insertMany(userData); // Seed new data
        console.log('Data seeded successfully');

        // Close the connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');

    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

// Run seeder
seedDatabase()
    .then(() => {
        console.log('Seeding completed');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error during seeding:', error);
        process.exit(1);
    });

