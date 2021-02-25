import React, { useEffect, useState } from 'react'
import Axios from "axios";

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        console.log("here is in Subscribe");
        //몇명이 이사람을 구독하는지 가져옴(구독자가 몇명인지) -> 업로드한 사람의 정보를 가져와야 함. videoDetailPage 에서 props로 넣어줌
        let variable = { userTo: props.userTo };
        Axios.post("/api/subscribe/subscribeNumber", variable)
            .then(response => {
                if (response.data.success) {
                    console.log("subscribeNumber data : "+response.data);
                    setSubscribeNumber(response.data.SubscribeNumberNumber);
                } else {
                    alert("get SubscribeNumber fail");
                }
            })

        //내가 이 사람을 구독하는지를 가져옴, useFrom 은 개발자도구 Application > localstorage
        let subscribedVar = {userTo: props.userTo, userFrom: localStorage.getItem("userId")};
        Axios.post("/api/subscribe/subscribed", subscribedVar)
        .then( response => {
            if (response.data.success) {
                console.log("subscribed data : "+response.data);
                setSubscribed(response.data.subscribed);
            } else {
                alert("get SubscribeNumber fail");
            }
        })
    }, [])

    const onSubscribe = () => {
        let subscribedVariable = {userTo: props.userTo, userFrom: props.userFrom}
        if (Subscribed) { //구독중이면 구독취소
            Axios.post("/api/subscribe/unSubscribe", subscribedVariable)
                .then(response => {
                    if (response.data.success) {
                        console.log(response.data);
                        setSubscribeNumber(SubscribeNumber-1);
                        setSubscribed(!Subscribed);
                    } else {
                        alert("unSubscribe fail");
                    }
                })
        } else { //구독중이 아니라면 구독
            Axios.post("/api/subscribe/subscribe", subscribedVariable)
                .then(response => {
                    if (response.data.success) {
                        console.log(response.data);
                        setSubscribeNumber(SubscribeNumber+1);
                        setSubscribed(!Subscribed);
                    } else {
                        alert("subscribe fail");
                    }
                })
        }
    }

    return (
        <div>
            <button
                style={{ backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000" }`, borderRadius: "4px", color: "white", padding: "10px 16px", fontWeight: "500", fontSize: "1rem", textTransform: "uppercase" }}
                onClick={onSubscribe}

            >
                {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
            </button>
        </div>
    )
}

export default Subscribe
