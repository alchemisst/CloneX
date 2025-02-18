const { Schema, default: mongoose, models, model } = require("mongoose");

const PostSchema = new Schema({
    author:{type:mongoose.Types.ObjectId, ref:'User'},
    text:String,
    likesCount:{type:Number,default:0},
    parent:{type:mongoose.Types.ObjectId,ref:'Post'}
},{
   timestamps:true
})

const Post = models?.Post || model('Post',PostSchema);

export default Post;
