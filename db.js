// backend/config/db.js
const {sequalize} = require('sequalize');
const dotenv = require('dotenv');

dotenv.config();
 
const sequalize = new sequalize(
    process.env.DB_NAME || 'healthcare_portal',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false,
    }
);

module.exports = sequalize;