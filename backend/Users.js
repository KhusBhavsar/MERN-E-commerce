const mongoose = require('mongoose');
const myUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const users = mongoose.model('users', myUserSchema);
module.exports = users;