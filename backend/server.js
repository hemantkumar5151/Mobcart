const app = require('./app');
const dotenv = require('dotenv');
const dbConnection = require('./config/db');
dbConnection()

dotenv.config({ path: './.env'});
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running at the port ${port} in ${process.env.NODE_ENV}`);
})