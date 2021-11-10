const user = require('../controllers/user.controller');
const valid = require('../../validations/valid');
module.exports = (app) => {
    const user = require('../controllers/user.controller');

    
    app.post('/register',valid.validationRules(),valid.validate, user.register);

  
    app.post('/login', user.login);
}