require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');

const dbConnectionString = process.env.DB_CONNECTION_STRING;

const connectDB = async () => {
    try {
        await mongoose.connect(dbConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect to the database');
    } catch (error) {
        throw new Error('MongoDB connection error:', error);
    }
}

module.exports = connectDB;

