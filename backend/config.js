const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const DB ='mongodb://127.0.0.1:27017/e-comm'

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
 })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log("Error connecting to MongoDB",err));
