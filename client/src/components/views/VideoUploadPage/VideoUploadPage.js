import React, { useState } from 'react';
import { Input, Typography, Button, Form } from 'antd';
import Dropzone from 'react-dropzone';

const { TextArea } = Input;
const { Title } = Typography;

//option을 위한 key 와 value
const PrivateOptions = [
    {value: 0, label: "Private"},
    {value: 1, label: "Public"}
]
const CategoryOptions = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Aninals"}
]

function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState("");
    const [VideoDesc, setVideoDesc] = useState("");
    const [Private, setPrivate] = useState(0);  //privite => 0, public => 1
    const [Category, setCategory] = useState("Film & Animation");

    const onTitleChange = (e) => {
        // e가 무엇이냐? console.log(e); 이벤트!
        setVideoTitle(e.currentTarget.value)
    }
    const onDescChange = (e) => {
        setVideoDesc(e.currentTarget.value)
    }
    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }
    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }
    return (
        <div style={{ maxWidth: '700px', margin:'2rem auto' }}>
            <div style={{ textAlign:'center', marginBottom:'2rem' }}>
                <Title level={2}> Upload Video! </Title>
            </div>

            <Form onSubmit>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <Dropzone>
                        {/* onDrop multiple maxSize */}
                        {({ getRootProps, getInputProps}) => (
                            <div sytle={{ width:'300px', height: '240px', border: '1px solid lightgray', alignItems:'center', justifyContent:'center' }} {...getRootProps()}>
                                <input {...getInputProps()} />
                                {/* <Icon type="plus" style= {{ fontSize:'3rem'}} /> */}
                            </div>
                        )}
                    </Dropzone>

                    {/* thumnails */}
                    <div>
                        <img />
                    </div>
                </div>

                <br/>
                <br/>

                <label>Title</label>
                <Input onChange={onTitleChange} value={VideoTitle} />
                {/* onChange가 있어야 글이 써짐 */}

                <br/>
                <br/>

                <label>Description</label>
                <TextArea onChange={onDescChange} value={VideoDesc} />

                <br/>
                <br/>

                <select onChange={onPrivateChange}>
                    {/* <option key value></option> option 여러개 => map 메소드 이용 */}
                    {PrivateOptions.map( (item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br/>
                <br/>

                <select onChange={onCategoryChange} value={Private}>
                    {CategoryOptions.map( (item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}

                </select>

                <br/>
                <br/>

                <Button type="primary" size="large" onClick>
                    Submit
                </Button>

            </Form>
        </div>
    )
}

export default VideoUploadPage