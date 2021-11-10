const mongoose = require("mongoose");

const CmtSchema = new mongoose.Schema({

    comment: String,
    userId: mongoose.Types.ObjectId,
    postId: mongoose.Types.ObjectId
}, {
    timestamps: true
});

module.exports = mongoose.model('Cmt', CmtSchema);











