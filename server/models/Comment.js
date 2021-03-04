const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        //얘만 있어도 user 모델 전부 가져올 수 있음
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String
    }

}, {timestamps: true} );


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }