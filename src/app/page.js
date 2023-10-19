import ImgData from '@/data'
import Link from 'next/link'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Home = () => {
  return (
    <Container>
      <Row>
        {
          ImgData?.map((item, keys) => {
            return <Col key={keys} xxl={4} lg={4} xl={4} className='py-4' >
              <Link href={`/${keys}`} className='colBox card'>
                <img src={item?.img} />
              </Link>
            </Col>
          })
        }

      </Row>
    </Container>
  )
}

export default Home
