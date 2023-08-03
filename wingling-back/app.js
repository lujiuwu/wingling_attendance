require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/database/database');
const port = process.env.PORT || 3000;
const app = express();
const routes = require('./src/routes');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use('/api', routes);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.error('Failed to connect to the database:', err);
})

