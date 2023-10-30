import React from 'react'
import { Container } from 'react-bootstrap'
import { FiGift } from 'react-icons/fi'
import { TbCategory } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import Link from 'next/link'
const Header = () => {
    return (
        <div className="alai-header d-flex justify-content-between align-items-center">
            <Container fluid className='d-flex justify-content-between align-items-center'>
                <div className="sp-logo d-flex align-items-center">
                    SnapMagic
                </div>
                <div className="sp-nav d-flex">
                    <Link href="/" className='btn sp-btn'>
                        <FiGift />
                        <span>Demo Content</span>
                    </Link>
                    <Link href="/" className='btn sp-btn'>
                        <TbCategory />
                        <span>Catalog</span>
                    </Link>
                    <Link href="/" className='btn sp-btn'>
                        <AiOutlinePlus />
                        <span>Add new photo</span>
                    </Link>
                </div>
            </Container>
        </div>
    )
}

export default Header
