const Post = require('../app/models/post.model')

exports.create = async (req, res) => {
    console.log('req.user',req.user)
    const existingTitle = await Post.findOne({ title: req.body.title })

    if (existingTitle) {
        return res.status(400).json({
            messsge: 'title already exists.....', code: 400, data: {}
        });
    }
    const post = new Post({

        title: req.body.title,
        description: req.body.description,
        createdBy: req.user

    });

    post.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error while creating"
            });

        });
};


// try {
//     const banners = await Banner.paginate({},{'page': req.query.page,limit : 5})
//     return res.status(200).json({
//         message : 'Success' , code : 200 , data : banners
//     })
// }
//myModel.paginate().then({});

exports.findAll = async (req, res) => {
    try {
        const post = await Post.paginate({},{'page': req.query.page,limit : 5})
        return res.send(post)
    } catch (e) {
        return res.status(404).send({
            message: e.message
        });
    }
};

exports.findOne = (req, res) => {
    Post.findById(req.params.postId)
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id" + req.params.postId
            });

        }
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).semd({
                message: 'Note not found with id ' + req.params.postId
            });
        }
        return res.status(500).send({
            message: 'error recived when the note finding with id' + req.params.postId
        });

    });
};

exports.update = (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            message: "title cannot be empty"
        });
    }
    Post.findByIdAndUpdate(req.params.postId, {
        title: req.body.title,
        description: req.body.description,
        
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "not found data with id" + req.params.postId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: " not found data with id" + req.params.postId
                });
            }
            return res.status(500).send({
                message: "Error updating data with id" + req.params.postId
            });
        });
};

exports.delete = (req, res) => {
    Post.findOneAndRemove({_id:req.params.postId, createdBy:req.user})
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Data not find with id" + req.params.postId
                });
            }
            res.send({ message: "data deleted successfully......" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'not found') {
                return res.status(404).send({
                    message: "data not found with id" + req.params.postId
                });
            }
            return res.status(500).send({
                message: "could not delete data with id" + req.params.postId
            });
        });
};










