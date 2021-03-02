const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             Comment
//=================================

router.post("/saveComment", (req, res) => {
    console.log(req.body);
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

module.exports = router;