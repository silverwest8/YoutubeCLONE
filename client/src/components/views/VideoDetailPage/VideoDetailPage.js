import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";
import { Row, Col, List, Avatar } from "antd";
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscriber from './Sections/Subscriber';
import Comment from './Sections/Comment';

function VideoDetailPage(props) {

	const videoId = props.match.params.videoId;

	const [VideoDetail, setVideoDetail] = useState([]);
	const [Comments, setComments] = useState([])

	const variable = { videoId: videoId };
	console.log(variable);
	
	useEffect(() => {
		Axios.post('/api/video/getVideoDetails', variable)
			.then(response => {
				if (response.data.success) {
					console.log(response.data.videodetail);
					setVideoDetail(response.data.videodetail);
					console.log("VideoDetail : ", VideoDetail);
				} else {
					alert("videodetail get fail");
				}
			})

		Axios.post('/api/comment/getComments', variable)
			.then(response => {
				if (response.data.success) {
					console.log(response.data.comments);
					setComments(response.data.comments);
					console.log("Comment : ", Comment);
				} else {
					alert("Comments get fail");
				}
			})
			
	}, [])

	const refreshFunction = (newComment) => {
		setComments(Comments.concat(newComment))

	}

	if (VideoDetail.writer) {
		const subscribeButton = VideoDetail.writer._id !== localStorage.getItem("userId") && <Subscriber userTo={VideoDetail.writer._id} userFrom={localStorage.getItem("userId")}/>;
		return (
			<Row gutter={[16, 16]}>
				<Col lg={18} xs={24}>
					<div style={{ width:"100%", padding:"3rem 4rem" }}>
						<video style={{ width: "100%" }} src={`http://localhost:4000/${VideoDetail?.filePath}`} />
						<List.Item
							actions={[ subscribeButton ]}
						>
							<List.Item.Meta
									avatar={ <Avatar src={VideoDetail.writer?.image} /> }
									title={ VideoDetail.writer?.name }
									// title={ VideoDetail.title }
									description={ VideoDetail.description }
							/>
						</List.Item>

						<Comment refreshFunction={refreshFunction} postId={videoId} commentList={Comments}></Comment>

					</div>
				</Col>

				<Col lg={6} xs={24}>
					<SideVideo />
				</Col>

			</Row>
		)
} else {
		return (
			<div> loding ...</div>
		)
	}
}

export default withRouter(VideoDetailPage);
