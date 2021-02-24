const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema({
    userTo: {
        //얘만 있어도 user 모델 전부 가져올 수 있음
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

}, {timestamps: true} );


const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber }