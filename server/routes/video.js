const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { Subscriber } = require("../models/Subscriber");


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
            count: 1,
            folder: "uploads/thumbnails",
            size: "320x240",
            //'%b' : input basename (filename w/o extension)
            filename: "thumbnail-%b.png"
        })
});

router.post("/uploadVideo", (req, res) => {
    console.log("uploadVideo = "+req.body);
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

router.get("/getVideos", (req, res) => {
    //video를 DB에서 가져와서 클라이언트에 보냄
    console.log("getVideos = ", req);
    Video.find()
        .populate("writer") //이렇게 해야 모든 정보를 가져옴. 안하면 id만 가져옴
        .exec( (err, videos) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                // console.log("videos" + videos);
                return res.status(200).json( {success: true, videos });
            }
        })//쿼리를 익스큐션

})

router.post("/getVideoDetails", (req, res) => {
    console.log("getVideoDetails = ", req.body);
    Video.findOne( {"_id": req.body.videoId } )
    // Video.findOne({ _id: "6032061842094d30d0a39b7d" })
        .populate("writer")
        .exec( (err, videodetail) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                // console.log("videodetail  --->   " + videodetail);
                return res.status(200).json( {success: true, videodetail });
            }
        })
})

router.post("/getSubscriptionVideo", (req, res) => {
    //자신의 아이디를 가지고 구독하는 사람들을 찾는다.
    Subscriber.find({ userFrom: req.body.userFrom })
        .exec( (err, subscriberInfo) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                let subscribedUser = [];
                subscriberInfo.map((subscriber, i) => {
                    subscribedUser.push(subscriber.userTo);
                })
                Video.find({ witer: { $in: subscribedUser }})
                    .populate("writer")
                    .exec( (err, videos) => {
                        if (err) {
                            return res.status(400).send(err);
                        } else {
                            // console.log("videos  --->   " + videos);
                            return res.status(200).json( {success: true, videos });
                        }
                    })
            }
        })

    //찾은 사람들의 비디오를 가지고 온다

})
module.exports = router;