import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";
// import { VideoCameraFilled } from '@ant-design/icons';
import Axios from "axios";
import { Typography, Row, Col, Card, Avatar } from 'antd';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage () {

    const [Video, setVideo] = useState([]);
    var subscriptionVar = {
        userFrom: localStorage.getItem("userId")
    }

    useEffect(() => {
        Axios.post("/api/video/getSubscriptionVideo", subscriptionVar)
            .then(response => {
                if (response.data.success) {
                    setVideo(response.data.videos);
                    console.log(response.data.videos);
                } else {
                    alert("get SubscriptionVideo fail");
                }
            })
    }, [])

    const renderCards = Video.map( (video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes*60);

        return <Col key={index} lg={6} md={8} xs={24} >

            <a href={`/video/${video._id}`} >
                <div style={{ position:"relative" }}>
                    <img style={{ width: "100%" }} src={`http://localhost:4000/${video.thumbnail}`} alt="thumbnail"/>
                    <div className="duration">
                        <span> {minutes} : {seconds} </span>
                    </div>
                </div>
            </a>
            <br/>
            <Meta
                avatar={<Avatar src={video.writer.image}/>}
                title={video.title}
                // description={video.description}
            />

            <span>{video.writer.name}</span>
            <br/>
            <span>{video.views} views      </span>
            <span>{moment(video.createdAt).format("MMM Do YY")}</span>
        </Col>

    })

    return (
        <div style={{ width: "85%", margin: "3rem auto" }}>
            <Title level={ 2 }> Recommended </Title>
            <hr />
            <Row gutter={[32, 16]}>

                {renderCards}

            </Row>
        </div>
    )
}

export default withRouter(SubscriptionPage );
