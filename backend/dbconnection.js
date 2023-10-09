const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connection = async () => {
    try {
        await mongoose.connect(process.env.REACT_APP_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = ()=>{
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
        try{
            mongoose.connect(process.env.BASE_URL.connectionParams);
            console.log("Connected to database successufully")
        }catch(error){
            console.log("could not connect to database");
        }
    }
