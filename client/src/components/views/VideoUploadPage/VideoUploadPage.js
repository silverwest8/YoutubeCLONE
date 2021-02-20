import React, { useState } from 'react';
import { Input, Typography, Button, Form, Icon } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import Axios from 'axios'

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


    const onDrop = (files) => {
        //files는 무엇인가?
        console.log(files);

        //header설정을 해야 오류를 막을 수 있음
        let formData = new FormData;
        const config = {
            header: {'contents-type': 'multipart/form-data'}
        }
        formData.append("file", files[0]);
        //첫번째껄 가져옴(array)

        //ajax같은 axios
        //라우터 -> 서버 -> routes -> video 일단 리퀘스트가 서버의 index.js로 감
        Axios.post("/api/video/uploadfiles", formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                } else {
                    alert('video upload fail');
                }
            })
    }
    
    return (
        <div style={{ maxWidth: '700px', margin:'2rem auto' }}>
            <div style={{ textAlign:'center', marginBottom:'2rem' }}>
                <Title level={2}> Upload Video! </Title>
            </div>

            <Form onSubmit>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                    {/* dropzone */}
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        //filed을 하나만 올릴거면 false
                        maxSize={10000000000}
                        //최대사이즈 컨트롤
                    >
                        {({ getRootProps, getInputProps}) => (
                            <div sytle={{ width:'300px', height: '240px', border: '1px solid lightgray', alignItems:'center', justifyContent:'center' }} {...getRootProps()}>
                                <input {...getInputProps()} />
                                {/* <Icon type="plus" style= {{ fontSize:'3rem'}} /> */}
                                <PlusSquareOutlined type="plus" style= {{ fontSize:'3rem' }} />
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