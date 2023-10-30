"use client"
import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { CgArrowLongRightC } from 'react-icons/cg'
import Image from 'next/image'
const FaceList = ({ item, data, faceList, setFaceList, keys }) => {
    const [isSelect, setIsSelect] = useState(false)
    const [Selected, setSelected] = useState('')

    const handleSelect = (key, payload) => {
        setSelected("data:image/png;base64," + payload)
        setFaceList({
            ...faceList,
            [keys]: key
        })
    }


    return (
        <div className="sp-face-list">
            <div className="sp-face">
                <Image src={"data:image/png;base64," + item} alt='techkilla' width={80} height={80} />
            </div>
            <div className="sp-face-arrow">
                <CgArrowLongRightC />
            </div>
            <div className="sp-select-face" onClick={() => setIsSelect(!isSelect)}>
                <div className="sp-face">
                    {
                        Selected ? <Image src={Selected} width={80} alt='techkilla' height={80} /> : <AiOutlinePlus />
                    }

                </div>

                <div className="text-dark fw-bold px-3">
                    Select Face
                </div>
                {
                    isSelect && <div className="face-grid">
                        {
                            data?.map((curItem, keys) => {
                                return <div className="sp-face" key={keys} onClick={() => handleSelect(keys, curItem)}>
                                    <Image src={"data:image/png;base64," + curItem} alt='techkilla' width={80} height={80} />
                                </div>
                            })
                        }

                    </div>
                }
            </div>
        </div>
    )
}

export default FaceList
