const cmt = require('../../controllers/cmt.controllers');
const {auth} = require('../routes/PostAuth/post.auth')
module.exports = (app) => {

    
    
    app.post('/cmt',auth, cmt.create);

    app.get('/cmt',auth,cmt.findAll);
  
    app.get('/cmt/:cmtId',auth, cmt.findOne);
    
    app.put('/cmt/:cmtId',auth, cmt.update);
    
    app.delete('/cmt/:cmtId',auth, cmt.delete);
}