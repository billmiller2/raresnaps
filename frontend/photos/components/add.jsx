import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import * as Ladda from 'ladda'
import styled from 'styled-components'

import { LightMauveButton } from '../../common'
import { uploadPhoto } from '../'

const Input = styled.input`
    &:required {
        box-shadow: none;
    }
`

export const AddPhoto = () => {
    const [file, setValue] = useState('')
    const [id, setId] = useState(0)
    const dispatch = useDispatch()
    const onSubmit = (file) => dispatch(uploadPhoto(file))

    if (id) {
        return <Redirect to={'/photos/view/' + id} />
    }

    return (
        <Row>
            <Col xs={12}>
                <form
                    encType='multipart/form-data'
                    onSubmit={(e) => {
                        const submit = Ladda.create(document.querySelector('#addPhotoButton'))
                        e.preventDefault()
                        submit.start()

                        return onSubmit(file)
                            .then((action) => {
                                submit.stop()
                                setId(Object.keys(action.payload.photos)[0])
                            })
                    }}>
                    <Row>
                        <Col xs={12} className='d-flex flex-wrap justify-content-center'>
                            <LightMauveButton className='mb-3'>
                            <Input
                                data-testid='fileInput'
                                type='file'
                                accept="image/png, image/jpeg"
                                onChange={(e) => setValue(e.target.files[0])}
                                required />
                            </LightMauveButton>
                            <LightMauveButton
                                className='ml-1 mb-3 ladda-button'
                                data-style='expand-right'
                                data-testid='addPhotoButton'
                                id='addPhotoButton'
                                type="submit">
                                Upload Photo
                            </LightMauveButton>
                        </Col>
                    </Row>
                </form>
            </Col>
        </Row>
    )
}
