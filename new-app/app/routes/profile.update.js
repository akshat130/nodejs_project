const update1 = require('../../controllers/profile.updatec');
const {auth} = require('../routes/PostAuth/post.auth')

module.exports = (app) =>{

    app.put('/user/:userId',auth, cmt.update);
}