const express = require('express');
const router = express.Router();
const { Subscriber } = require("../models/Subscribe");

//=================================
//             Subscribe
//=================================

// router.post("/api/subscribe/uploadfiles")
// index.js 에서 api/subscribe는 읽었으니까 안써줘도 됨.

router.post("/subscribeNumber", (req, res) => {
    console.log("subscribeNumber" + req.body);
    Subscriber.find({'userTo': req.body.userTo})
        .exec( (err, subscribe) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                return res.status(200).json({success: true, subscribeNumber: subscribe.length});
            }
        })
})

router.post("/subscribed", (req, res) => {
    console.log("subscribed" + req.body);
    Subscriber.find({'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
        .exec( (err, subscribe) => {
            if (err) {
                return res.status(400).send(err);
            } else if (subscribe.length !== 0) {
                let result = true;
                return res.status(200).json({success: true, subscribed: result});
            }
        })
})

module.exports = router;