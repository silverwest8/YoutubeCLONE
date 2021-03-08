const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================x
//             Comment
//=================================

router.post("/saveComment", (req, res) => {ㅌ
    console.log("saveComment=", req.body);
    const comment = new Comment(req.body);
    comment.save( (err, comment) => {
        if (err) {
            return res.status(401).send(err);
        } else {
            Comment.find( {"_id" : comment._id})
                .populate("writer")
                .exec((err, result) => {
                    if (err) {
                        res.status(402).send(err);
                    } else {
                        res.status(200).json({ success: true, result });
                    }
                })
        }
    })
})

router.post("/getComments", (req, res) => {
    console.log("getComments=", req.body);
    Comment.find({"postId": req.body.videoId})
        .populate('writer')
        .exec((err, comments) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                return res.status(200).json({success: true, comments});
            }
        })
});

module.exports = router;