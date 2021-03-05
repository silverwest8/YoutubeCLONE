import React, { Fragment } from 'react'
import SingleComment from "./SingleComment";

function ReplyComment(props) {

    const renderReplyComment = (parentCommentId) => {
        props.commentList.map((comment, index) => (
            <Fragment>
                {
                    comment.responseTo === parentCommentId && 
                    <div>
                        <SingleComment key={index} comment={comment} postId={props.postId} user={props.user} refreshFunction={props.refreshFunction}/>
                        <ReplyComment commentList={props.commentList} parentCommentId={comment._id} postId={props.postId} user={props.user}/>
                    </div>
                }
            </Fragment>
        ))

    }
    return (
        <div>
            <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick>
                View 1 more comment(s)
            </p>
            {renderReplyComment(props.parentCommentId)}
        </div>
    )
}

export default ReplyComment
