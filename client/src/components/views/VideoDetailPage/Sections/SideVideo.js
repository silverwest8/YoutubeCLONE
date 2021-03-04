import React, { useEffect, useState } from 'react'
import Axios from "axios";
import { withRouter } from "react-router-dom";

function SideVideo() {
    console.log("in Side Video...");
    //array 에 담기
    const [sideVideos, setsideVideos] = useState([]);

    //[] 있으면 dom 이 업데이트될때 한번만 실행 (functional)
    //class Component 에서는 compnentdidMount 이런식...
    useEffect(() => {
        Axios.get("/api/video/getVideos")
            .then(response => {
                if (response.data.success) {
                    setsideVideos(response.data.videos);
                    console.log(response.data.videos);
                } else {
                    alert("get videos fail");
                }
            })
    }, [])

    const renderSideVideo = sideVideos.map( (video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes*60);

        return (
            <div key={index} style={{ display: "flex", marginBottom: "1rem", padding: "0 1rem" }}>
                <div style={{ width: "50%", marginRight: "1rem" }}>
    
                    <a href={`/video/${video._id}`}>
                        <img
                            style={{ width: "100%", height: "100%", marginBottom: "1rem" }}
                            src={`http://localhost:4000/${video.thumbnail}`}
                            alt="thumbnail"
                        />
                    </a>
    
                </div>
                <div style={{ width: "50%"}} >
                    <a href={`/video/${video._id}`}>
                        <span style={{ fontSize:"1rem", color: "black" }}>{video.title}</span><br/>
                        <span>{video.writer.name}</span><br/>
                        <span>{video.views} views</span><br/>
                        <span>{minutes} : {seconds}</span>
                    </a>
                </div>
    
            </div>
        )
    })

    return (
        <React.Fragment>
            <div style={{ marginTop: "3rem" }} >
                {renderSideVideo}
            </div>
        </React.Fragment>
    )
}

export default withRouter(SideVideo);
