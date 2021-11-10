const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = new mongoose.Schema({
    
      title : String,
      description : String,
      createdBy : mongoose.Types.ObjectId

},
{
    timestamps: true
});

PostSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Post',PostSchema);