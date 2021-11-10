const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    Mobile: String,
    Email: String,
    Password: String,
    ConfirmPassword: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);