const New = require('../app/models/new.model');

exports.create = async (req, res) => {
    //console.log('req.body',req.body)
    const existingUser = await New.findOne({ email: req.body.email })
    
    if (existingUser) {
        return res.status(400).json({
            message: 'Email already exists.....', code: 400, data: {}
        });
    }

    const existingMobile = await New.findOne({ mobile: req.body.mobile })

    if (existingMobile) {
        console.log('existingMobile', existingMobile);
        return res.status(400).json({
            message: 'Mobile number already exists......', code: 400, data: {}
        });
    }

    const new1 = new New({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password


    });

    new1.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error while creating new data...."
            });
        });
};

exports.findAll = (req, res) => {
    New.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error while find data...."
            });
        });
};

exports.findOne = (req, res) => {
    New.findById(req.params.newId)
    then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.newId
            });
        }
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.newId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.newId
        });
    });
};

exports.update = (req, res) => {
    New.findByIdAndUpdate(req.params.newId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.newId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.newId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.newId
            });
        });
};

exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.newId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.newId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.newId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.newId
            });
        });
};

