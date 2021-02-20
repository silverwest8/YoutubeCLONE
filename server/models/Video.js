const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    writer: {
        //얘만 있어도 user 모델 전부 가져올 수 있음
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        maxlenghth: 50
    },
    description: {
        type: String
    },
    privacy: {
        type: Number
    },
    filePath: {
        type: String
    },
    category: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }
}, {timestamps: true} );


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }