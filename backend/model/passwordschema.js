const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    websiteName: {
        type: String,
        required: true
    },
    websiteLink: {
        type: String,
        required: true
    },
    usernameOrEmail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Password = mongoose.model('Password', passwordSchema);

module.exports = Password;
