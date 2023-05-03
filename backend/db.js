const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0"

const connectToMongo = () => {

    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('Connected to database!');
        })
        .catch((err) => {
            console.log('Error connecting to database: ', err);
        });
    // mongoose.connect(mongoURI, () => {
    //     console.log("connected to mongo successfully")
    // })
}
module.exports = connectToMongo;