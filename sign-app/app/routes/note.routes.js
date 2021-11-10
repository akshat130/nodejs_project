const notes = require('../controllers/note.controller.js');
const valid = require('../../validations/valid');
const { auth } = require('../../Auth/auth.js');

module.exports = (app) => {
    // Create a new Note
    app.post('/notes',auth, valid.validationRules(), valid.validate, notes.create);

    // Retrieve all Notes
    app.get('/notes',auth, notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId',auth, notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId',auth, valid.validationRules(), valid.validate, notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId',auth, notes.delete);
    
}