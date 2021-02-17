import React from 'react'
import { VideoCameraFilled } from '@ant-design/icons';

function LandingPage() {
    return (
        <>
            <div className="app">
                {/* <FaCode style={{ fontSize: '4rem' }} /> */}
                <VideoCameraFilled style={{ fontSize: '4rem' }} />
                <br />
                <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
            </div>
            <div style={{ float: 'right' }}>Thanks For Using This Boiler Plate by John Ahn</div>
        </>
    )
}

export default LandingPage;
