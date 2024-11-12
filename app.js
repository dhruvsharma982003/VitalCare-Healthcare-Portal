// backend/app.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();

// Database
const db = require('./config/db');

// Passport Config 
require('./config/passport')(passport);

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Express Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth',  require('./routes/authRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/medical-records', require('./routes/medicalRecordRoutes'));

// Test Route
app.get('/', (req, res) => {
    res.send('Healthcare Portal API');
});

// Sync Database and Start Server
db.sync()
.then(() => {
    console.log('Database synced');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

.catch(err => console.log('Error syncing database:', err));    