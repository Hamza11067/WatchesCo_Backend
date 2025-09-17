const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb+srv://hamzakhalid1067:Hamza1067@cluster0.wargw.mongodb.net/WatchesCo');
        console.log("Database connected successfully!!!");
    } catch (error) {
        console.log("Database Connection Error : " + error)
    }
}

module.exports = connectDB;