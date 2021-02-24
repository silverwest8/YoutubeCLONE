import React, { useEffect, useState } from 'react'
import Axios from "axios";

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState("")
    const [Subscribed, setSubscribed] = useState("")

    useEffect(() => {
        console.log("here is in Subscribe");
        //몇명이 이사람을 구독하는지 가져옴(구독자가 몇명인지) -> 그러니까 업로드한 사람의 정보를 가져와야 함. videoDetailPage 에서 props로 넣어줌
        let variable = { userTo: props.userTo };
        Axios.post("/api/subscribe/subscribeNumber", variable)
            .then( response => {
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

    return (
        <div>
            <button
                style={{ backgroundColor: `${Subscribed ? "#CC0000" : "#AAAAAA"}`, borderRadius: "4px", color: "white", padding: "10px 16px", fontWeight: "500", fontSize: "1rem", textTransform: "uppercase" }}

            >
                {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
            </button>
        </div>
    )
}

export default Subscribe
