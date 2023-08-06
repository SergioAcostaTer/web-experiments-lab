//userConnectModel.js

var mongoose = require('mongoose');

var userConnectSchema = new mongoose.Schema({
    socketId: String
});

module.exports = mongoose.model('UserConnect', userConnectSchema);
