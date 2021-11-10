const user = require('../../controllers/user.controllers');
const valid = require('../../validations/valid');
module.exports = (app) => {
    const user = require('../../controllers/user.controllers');

    
    app.post('/register',valid.validationRules(),valid.validate, user.register);

  
    app.post('/login', user.login);
}