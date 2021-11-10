module.exports = (app) => {
    const public = require('../../controllers/public.controllers');

    // list data
    app.get('/public', public.findAll);
}