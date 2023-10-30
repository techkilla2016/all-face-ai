import React from 'react'
import Image from 'next/image'
const Preview = ({ file }) => {
    return (
        <div className='sp-selected'>
            <Image src={file} width={500} height={350}alt='techkilla' />
        </div>
    )
}

export default Preview
