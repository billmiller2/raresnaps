import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'

const Input = styled.input`
    color: #ffffff;
`
const Submit = styled(Button)`
    background-color: #ffffff;
    border: 1px solid;
    color: #a17188;
    &:hover {
        background-color: #a17188;
        color: #ffffff;
        border-color: #a17188;
    }
`

export const AddPhoto = (props) => {
    const { onSubmit } = { ...props }
    const [file, setValue] = useState('')

    return (
        <Row>
            <Col xs={12}>
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
            </Col>
        </Row>
    )
}
