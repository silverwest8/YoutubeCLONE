import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from "antd";
import Axios from 'axios';

function VideoDetailPage(props) {

    const [VideoDetail, setVideoDetail] = useState([]);

    useEffect(() => {
        const videoID = props.match.params.videoId;
        const variable = { "videoId": videoID };
        console.log(variable);
        Axios.get("/api/video/getVideoDetails", variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setVideoDetail(response.data.videoDetail);
                } else {
                    alert("videoDetail get fail");
                }
            })
    }, [])

    if (VideoDetail.writer) {
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width:"100%", padding:"3rem 4rem" }}>
                        <video style={{ width: "100%" }} src={`http://localhost:4000/${VideoDetail?.filePath}`} />

                        <List.Item>
                            <List.Item.Meta
                                avatar={ <Avatar src={VideoDetail.writer?.image} /> }
                                title={ VideoDetail.writer?.name }
                                description={ VideoDetail.description }
                            />
                        </List.Item>

                    </div>
                </Col>

            </Row>
        )
    } else {
        return (<div> loading... </div>)
    }
}

export default VideoDetailPage
