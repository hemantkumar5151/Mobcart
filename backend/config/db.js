const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});

const dbConnection = async () => {
    try {
        const dbUrl = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
        const dbConn = await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log('Connection established successfully!');
        return dbConn;
    } catch (error) {
        console.log('Connection Failed!!!', error.message);
    }
}

module.exports = dbConnection;