const New = require('../app/models/new.model');
exports.update = (req, res) => {

    New.findByIdAndUpdate(req.params.newId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile
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