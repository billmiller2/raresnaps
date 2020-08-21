import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const Input = styled.input`
    color: #ffffff;
`
const Submit = styled(Button)`
    background-color: #a17188;
    border: 1px solid;
    color: #ffffff;
`

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
            <Input
                type='file'
                accept="image/png, image/jpeg"
                className='btn btn-default'
                onChange={(e) => setValue(e.target.files[0])}>
            </Input>
            <Submit className="btn" type="submit">
                Upload
            </Submit>
        </form>
    )
}
