"use client"
import React, { useEffect, useState } from 'react'
import SelectImg from '@/components/SelectImg'
import Loader from '@/components/loader'
import Header from '@/components/Header'
import SwapFace from '@/components/SwapFace'
import { Card, Col, Container, Row } from 'react-bootstrap'

const Home = () => {
  const [result, setResult] = useState()
  const [temp, setTemp] = useState()
  const [isLoader, setIsLoader] = useState(false)
  const [dataList, setDataList] = useState({})
  return (
    <>
      {isLoader ? <Loader /> : ''}
      <div className='alai-main'>
        <div className="alai-container">
          {/* header  */}
          <Header />
          <Container>
            {
              temp ? <SwapFace temp={temp} data={result} dataList={dataList} setIsLoader={setIsLoader} /> : <>
                <SelectImg
                  setTemp={setTemp}
                  setResult={setResult}
                  setIsLoader={setIsLoader}
                  setDataList={setDataList} />
              </>
            }
          </Container>
        </div>
      </div>
    </>
  )
}

export default Home
