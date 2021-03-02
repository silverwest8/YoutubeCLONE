import React, { useEffect, useState } from 'react'
import Axios from "axios";
import { useSelector } from 'react-redux';

function Comment(props) {
    const videoId = props.postId;
    const [commentValue, setcommentValue] = useState("");
    const user = useSelector(state => state.user);
    const handleClick = (e) => {
        setcommentValue(e.currentTarget.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const variable = {
            content: commentValue,
            //writer- 로컬스토리지 말고 리덕스 훅(react-reaux 의 useSelector) 사용
            writer: user,
            postId: videoId
        };
        Axios.post("/api/comment/saveComment", variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result);
                } else {
                    alert("saveComment fail");
                }
            })

    }

    return (
        <div>
            <br/>
            <p> Replies </p>
            <hr/>

            {/* Commnet Lists */}

            {/* Root Comment Form */}

            <form style={{ display: "flex"}} onSubmit={onSubmit}>
                <textarea
                    style={{ width: "100%", borderRadius: "5px" }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="write comment..."/>
                <br/>
                <button style={{ width: "20%", height: "52px"}} onClick={onSubmit}> Submit </button>
            </form>
        </div>
    );
}

export default Comment;
