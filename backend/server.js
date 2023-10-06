const express = require('express');
const cors = require('cors');
const connection = require('./dbconnection');

connection();
const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/signup', require('./routes/userRoute'));

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
});