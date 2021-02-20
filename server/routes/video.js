const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");

const multer = require("multer")

//Storage Multer Config 
//https://github.com/expressjs/multer/blob/master/doc/README-ko.md

let Storage = multer.diskStorage( {
    destination: (req, file, cb) => {
        cb(null, "nuploads/");
    },
    
    filename: (req, file, cb) => {
        cb(null, `${Data.now()}_${file.originalname}`);
    },

    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if ( ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        } else {
            cb(null, true);
        }
    }
} );

//변수에 저장
const upload = multer( {storage: Storage} ).single("file");

//=================================
//             Video
//=================================

// router.post("/api/video/uploadfiles")
// index.js 에서 api/video는 읽었으니까 안써줘도 됨.
router.post("/uploadfiles", (req, res) => {
    //req는 영상파일(formData)

    //  비디오를 서버에 저장 -> multer

    upload ( req, res, err => {
        if (err) {
            return res.json( {success: false, err} )
        } else {
            return res.json( {success: true, url: res.req.file.path, fileName: res.req.file.filename });
        }
    })
})

module.exports = router;