import React from 'react'

export const AddPhoto = (props) => {
    const { onClick } = { ...props }

    return (
        <button 
            className='btn btn-default'
            style={{ color: '#ffffff', border: '1px solid' }}
            onClick={() => onClick()}>
            Upload Photo
        </button>
    )
}
