"use client"
import React, { useState } from 'react'
import Preview from '@/components/Preview'
import { Col, Row } from 'react-bootstrap'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiArrowFromLeft } from 'react-icons/bi'
import axios from 'axios'
const SelectImg = ({ setResult, setIsLoader, setTemp }) => {
    const [state, setState] = useState({
        choice: '',
        image: '',
    })

    const handleChnage = ({ target }) => {
        const { files, name } = target
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {
            const base64String = reader.result;
            setState({
                ...state,
                [name]: base64String
            })
        };
    }
    const handleSubmit = async () => {
        try {
            setIsLoader(true)
            const res = await axios.post('https://b723-103-17-110-127.ngrok-free.app/rec', {
                choice: state.choice.split(',')[1],
                image: state.image.split(',')[1],
            })

            setResult(res?.data)  // store result
            setTemp(state) // store template Image
            setIsLoader(false) // set Loader 

        } catch (error) {
            setIsLoader(false)
            console.log(error)
        }
    }
    return (
        <Row className='sp-section align-items-center justify-content-center'>
            <input type="file" id='choice' name='choice' onChange={handleChnage} />
            <input type="file" id='image' name='image' onChange={handleChnage} />
            <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12} className='d-flex justify-content-center'>
                <label htmlFor="image">
                    {
                        state?.image ? <Preview file={state?.image} /> : <>
                            <AiOutlinePlus />
                            <span>Template</span>
                        </>
                    }
                </label>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12} className='d-flex justify-content-center'>
                <label htmlFor="choice">
                    {
                        state?.choice ? <Preview file={state?.choice} /> : <>
                            <AiOutlinePlus />
                            <span>Face </span>
                        </>
                    }
                </label>
            </Col>
            <div className="d-flex justify-content-center sp-submit">
                <button className='btn swap-btn' onClick={handleSubmit}>
                    <span className='px-2'>Swap Faces</span>
                    <BiArrowFromLeft />
                </button>
            </div>
        </Row>
    )
}

export default SelectImg
