import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";
import { withRouter } from "react-router-dom";

const { TextArea } = Input;

function SingleComment(props) {
    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("");
    const user = useSelector(state => state.user);
    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply);
    }
    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.CommentValue);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const variable = {
            content: CommentValue,
            //writer- 로컬스토리지 말고 리덕스 훅(react-reaux 의 useSelector) 사용
            writer: user.userData._id,
            postId: props.postId,
            ResponseTo: props.comment._id 
        };

        Axios.post("/api/comment/saveComment", variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result);
                    setCommentValue("");
                    props.refreshFunction(response.data.result);
                } else {
                    alert("saveComment fail");
                }
            })
    }
    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to"> Reply to </span>
    ];

    return (
        <div>
            <Comment 
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt />}
                contents={<p>{props.comment.content}s</p>}
            />

            { OpenReply && 
                <form style={{ display: "flex"}} onSubmit={onSubmit}>
                    <textarea
                        style={{ width: "100%", borderRadius: "5px" }}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="write comment..."/>
                    <br/>
                    <button style={{ width: "20%", height: "52px"}} onClick={onSubmit}> Submit </button>
                </form>
            }
        </div>
    )
}

export default withRouter(SingleComment);
