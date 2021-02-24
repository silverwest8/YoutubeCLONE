import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";
import { Row, Col, List, Avatar } from "antd";
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';


function VideoDetailPage(props) {

    const [VideoDetail, setVideoDetail] = useState([]);
    const videoId = props.match.params.videoId;
    const variable = { "videoId": videoId };

    useEffect(() => {
        console.log(variable);
        Axios.get('/api/video/getVideoDetails', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setVideoDetail(response.data.videoDetail);
                } else {
                    alert("videoDetail get fail");
                }
            })
    }, [])

    return (
        <Row gutter={[16, 16]}>
            <Col lg={18} xs={24}>
                <div style={{ width:"100%", padding:"3rem 4rem" }}>
                    <video style={{ width: "100%" }} src={`http://localhost:4000/${VideoDetail?.filePath}`} />

                    <List.Item
                        actions={[<Subscribe userTo={VideoDetail.writer?._id} />]}
                    >
                        <List.Item.Meta
                            avatar={ <Avatar src={VideoDetail.writer?.image} /> }
                            title={ VideoDetail.writer?.name }
                            // title={ VideoDetail.title }
                            description={ VideoDetail.description }
                        />
                    </List.Item>

                    {/* Comment */}

                </div>
            </Col>

            <Col lg={6} xs={24}>
                <SideVideo />
            </Col>

        </Row>
    )
}

export default withRouter(VideoDetailPage);
