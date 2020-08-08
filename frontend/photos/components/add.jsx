import React, { useState } from 'react'

export const AddPhoto = (props) => {
    const { onSubmit } = { ...props }
    const [file, setValue] = useState('')

    return (
        <form 
            encType='multipart/form-data' 
            onSubmit={(e) => {
                e.preventDefault()

                return onSubmit(file)
            }}>
            <input
                type='file'
                accept="image/png, image/jpeg"
                className='btn btn-default'
                onChange={(e) => setValue(e.target.files[0])}
                style={{ color: '#ffffff' }}>
            </input>
            <button
                className="btn btn-default"
                type="submit"
                style={{ color: '#ffffff', border: '1px solid' }}>
                Upload
            </button>
        </form>
    )
}
