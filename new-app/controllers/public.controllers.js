const Public = require('../app/models/post.model')

exports.findAll = (req, res) => {
    Public.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error while finding the data"
            });
        });
};