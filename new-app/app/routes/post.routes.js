const post = require('../../controllers/post.controllers');
const valid = require('../../validations/post.vaild')
const {auth} = require('../routes/PostAuth/post.auth')
module.exports = (app) => {



    app.post('/post', auth,valid.validationRules(), valid.validate, post.create);


     app.get('/post', auth, post.findAll);


     app.get('/post/:postId', auth, post.findOne);


     app.put('/post/:postId', auth, valid.validationRules(), valid.validate, post.update);


     app.delete('/post/:postId', auth, post.delete);
}