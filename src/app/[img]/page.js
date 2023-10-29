"use client"
import React, { useEffect, useState } from 'react'
import ImgData from '@/data'
import ImgDataBase64 from '@/data/base64'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import { AiOutlinePlus, AiOutlinePlusCircle } from 'react-icons/ai'
import { FaPeopleArrows } from 'react-icons/fa'
import Loader from '@/components/loader'
import axios from 'axios'
const Page = ({ params }) => {
    const [data, setData] = useState([])
    const [temp, setTemp] = useState('')
    const [curImage, setCurImage] = useState('')
    const [result, setResult] = useState()
    const [show, setShow] = useState(false)
    const [ResultShow, setResultShow] = useState()
    const [isLoader, setIsLoader] = useState(false)
    useEffect(() => {
        const newList = ImgData.filter((item, keys) => {
            if (keys == params?.img) {
                setTemp(ImgDataBase64[keys].base64)
                return item
            }
        })
        setData(newList)

    }, [])
    const handleChange = ({ target }) => {
        const file = target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const base64String = reader.result;
            setCurImage(base64String);
        };
    }

    const [choiseList, setChoiseList] = useState({})
    const handleUpload = () => {
        setIsLoader(true)
        axios.post('https://2964-103-17-110-97.ngrok-free.app/rec', {
            choice: curImage.split(',')[1],
            image: temp
        }).then(res => {
            setResult(res?.data)
            let selectList = {};
            res?.data?.first?.map((_d, key) => {
                console.log(_d, key)
                selectList[`${key}`] = 0
            })
            console.log(selectList)
            setChoiseList(selectList)
            setIsLoader(false)
        }).catch(error => {
            setIsLoader(false)
            console.log(error)
        })
    }

    const handleChoice = (payload, key) => {
        setChoiseList({ ...choiseList, ...key })
    }

    const handleSubmit = () => {
        setIsLoader(true)
        axios.post('https://2964-103-17-110-97.ngrok-free.app/send', {
            choice: temp,
            image: curImage.split(',')[1],
            map: Object.values(choiseList)
        }).then(res => {
            console.log(res)
            setResultShow("data:image/png;base64," + res?.data?.result)
            setShow(true)
            setIsLoader(false)
        }).catch(error => {
            console.log(error)
            setIsLoader(false)
        })
    }
    return (
        data ? (
            <>
                <div className='position-relative main'>
                    <div className="bgCover">
                        <img src={`${data[0]?.img}`} alt="" />
                    </div>
                    <div className='aiBG'>
                        {result ? <Container>
                            <Row className='justify-content-center align-items-center'>
                                {
                                    result?.first?.map((item, keys) => {
                                        return <Col xxl={5} xl={5} lg={5} md={8} sm={10} xs={12} className='py-3' key={keys}>
                                            <div className='bg-light bgContainer'>
                                                <div className="d-flex align-items-center justify-content-between ">
                                                    <div className="resImg">
                                                        <img src={'data:image/png;base64,' + item} alt="" />
                                                    </div>
                                                    <div className='arrowConvert px-5'>
                                                        <FaPeopleArrows />
                                                    </div>
                                                    <SelectImg result={result?.second} face={keys} handleChoice={handleChoice} />
                                                </div>
                                            </div>
                                        </Col>
                                    })
                                }
                            </Row>
                            <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>

                        </Container> : (
                            <Container>
                                <Row className='imgConvert align-items-center justify-content-between'>
                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12} className={'py-5'}>
                                        <div className="aiPhoto">
                                            <img src={`${data[0]?.img}`} alt="" />
                                        </div>
                                    </Col>
                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12} className={'py-5'} >
                                        <input type="file" id='img2' onChange={handleChange} />
                                        <label className="dropImg card" htmlFor="img2" >
                                            {
                                                curImage ? <img src={curImage} alt="" /> : <AiOutlinePlusCircle />
                                            }
                                        </label>
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-center">
                                    <button className='btn btn-light fw-bold uploadbtn' onClick={handleUpload}>Upload</button>
                                </div>
                            </Container>
                        )}


                        {/* {
                        result ? result?.first?.map((item) => {
                            return <img src={'data:image/png;base64,' + item} alt="" />
                        }) : ""
                    }
                    {
                        result ? result?.second?.map((item) => {
                            return <img src={'data:image/png;base64,' + item} alt="" />
                        }) : ""
                    } */}
                    </div>
                </div>

                <Modal show={show}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={() => setShow(false)}
                >
                    < img src={ResultShow} alt="" />
                </Modal>

                {
                    isLoader ? <Loader /> : ''
                }
            </>

        ) : ''
    )
}

export default Page

function SelectImg({ result, handleChoice, face }) {
    const [isSelect, setIsSelect] = useState(false)
    const [curImage, setCurImage] = useState()
    const handleSelect = (item, keys) => {
        setCurImage(item)
        handleChoice(item, { [`${face}`]: keys })
    }
    return <button className="resImg" onClick={() => setIsSelect(!isSelect)}>
        {curImage ?
            <img src={'data:image/png;base64,' + curImage} alt="" /> : <AiOutlinePlus/>}
        {
            isSelect ? <div className='selectImg'>
                {
                    result?.map((item, keys) => {
                        return <div key={keys}>
                            <button className="resImgselect" onClick={() => handleSelect(item, keys)}>
                                <img src={'data:image/png;base64,' + item} alt="" />
                            </button>
                        </div>
                    })
                }
            </div> : ''
        }
    </button>
}