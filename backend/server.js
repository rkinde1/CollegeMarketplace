const express = require('express');
const cors = require('cors');
const connection = require('./dbconnection');

connection();
const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/signup', require('./routes/userRoute'));
app.use('/api/login', require('./routes/loginRoute'));
app.use('/api/items', require('./routes/itemRoute'));
app.use('/api/email', require('./routes/emailRoute'));
app.use('/api/reset', require('./routes/reset-password'));
app.use('/api/forgot-password', require('./routes/forgot-password'));

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
});
