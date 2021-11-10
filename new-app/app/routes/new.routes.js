module.exports = (app) => {
    const new1 = require('../../controllers/new.controllers');

    // Create a new Note
    app.post('/new', new1.create);

    // Retrieve all Notes
    app.get('/new', new1.findAll);

    // Retrieve a single Note with noteId
    app.get('/new/:newId', new1.findOne);

    // Update a Note with noteId
    app.put('/new/:newId', new1.update);

    // Delete a Note with noteId
    app.delete('/new/:newId', new1.delete);
}