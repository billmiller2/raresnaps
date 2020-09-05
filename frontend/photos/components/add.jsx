import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'

const Input = styled.input`
    color: #ffffff;
`

import { LightMauveButton } from '../../common'

export const AddPhoto = (props) => {
    const { onSubmit } = props
    const [file, setValue] = useState('')
    const [id, setId] = useState(0)

    if (id) {
        return <Redirect to={'/photos/view' + id} />
    }

    return (
        <Row>
            <Col xs={12}>
                <form 
                    encType='multipart/form-data' 
                    onSubmit={(e) => {
                        e.preventDefault()

                        return onSubmit(file)
                            .then((action) => {
                                setId(Object.keys(action.payload.photos)[0])
                            })
                    }}>
                    <Input
                        type='file'
                        accept="image/png, image/jpeg"
                        className='btn btn-default'
                        onChange={(e) => setValue(e.target.files[0])}>
                    </Input>
                    <LightMauveButton type="submit">
                        Upload
                    </LightMauveButton>
                </form>
            </Col>
        </Row>
    )
}
