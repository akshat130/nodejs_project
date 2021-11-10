const Cmt = require('../app/models/cmt.model')

exports.create = async (req,res) => {
    const cmt = new Cmt({
    comment: req.body.comment,
    userId: req.user,
    postId: req.body.postId
    });

    cmt.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error while creating"
            });

        });
};

exports.findAll = (req, res) => {
    Cmt.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error while finding the data"
            });
        });
};

exports.findOne = (req, res) => {
    Cmt.findById(req.params.cmtId)
    then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id" + req.params.cmtId
            });

        }
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).semd({
                message: 'Note not found with id ' + req.params.cmtId
            });
        }
        return res.status(500).send({
            message: 'error recived when the  note finding with id' + req.params.cmtId
        });

    });
};

exports.update = (req, res) => {
    
    Cmt.findByIdAndUpdate(req.params.cmtId, {
        comment: req.body.comment,
        postId: req.body.postId,
        
        
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "not found data with id" + req.params.cmtId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: " not found data with id" + req.params.cmtId
                });
            }
            return res.status(500).send({
                message: "Error updating data with id" + req.params.cmtId
            });
        });
};

exports.delete = (req, res) => {
    Cmt.findOneAndRemove({_id:req.params.cmtId,userId:req.user})
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Data not find with id" + req.params.cmtId
                });
            }
            res.send({ message: "data deleted successfully......" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'not found') {
                return res.status(404).send({
                    message: "data not found with id" + req.params.cmtId
                });
            }
            return res.status(500).send({
                message: "could not delete data with id" + req.params.cmtId
            });
        });
};


