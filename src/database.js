const mongoose = require('mongoose');

const { HEALTH_APP_MONGODB_HOST , HEALTH_APP_MONGODB_DATABASE} = process.env;
const MONGODB_URI = `mongodb://${HEALTH_APP_MONGODB_HOST}/${HEALTH_APP_MONGODB_DATABASE}`;

// ---------- Creating connection to MongoDB -----------

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}). then (db => console.log('Database is connected'))
.catch(error => console.log(error));