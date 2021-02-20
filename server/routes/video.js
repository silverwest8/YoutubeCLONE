const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

//Storage Multer Config 
//https://github.com/expressjs/multer/blob/master/doc/README-ko.md

let Storage = multer.diskStorage( {
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },

    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if ( ext !== '.mp4' || ext !== '.mov') {
            return cb(res.status(400).end('only mp4 and mov is allowed'), false);
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

router.post("/thumbnail", (req, res) => {

    //썸네일 생성하고 비디오 러닝타임 정보 가져오기 -> ffmpeg
    console.log("in router.post");
    let filePath = "";
    let fileDuration = "";

    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function(err, metadata) {
        console.dir(metadata); //all metadata
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    });

    //썸네일 생성
    ffmpeg(req.body.url) //경로
        .on('filenames', function(filenames) {
            console.log("Will generate" + filenames.join(', '));
            console.log(filenames);
            filePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function() {
            console.log("Screenshots taken");
            return res.json( {success:true, url:filePath, fileDuration: fileDuration} );
        })
        .on('error', function(err) {
            console.error(err);
            return res.json( {success:false, err} );
        })
        .screenshots( {
            //willl take screenshots at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: "uploads/thumbnails",
            size: "320x240",
            //'%b' : input basename (filename w/o extension)
            filename: "thumbnail-%b.png"
        })
});

router.post("/uploadVideo", (req, res) => {
    //비디오 정보 저장, body -> 모든 정보 가져옴
    const video = new Video(req.body)
    video.save( (err, doc) => {
        if(err) {
            return res.json( {success: false, err} )
        } else {
            return res.json( {success: true} )
        }
    })
});

module.exports = router;