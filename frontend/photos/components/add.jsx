import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import * as Ladda from 'ladda'
import styled from 'styled-components'

import { LightMauveButton } from '../../common'

const Input = styled.input`
    &:required {
        box-shadow: none;
    }
`

export const AddPhoto = (props) => {
    const { onSubmit } = props
    const [file, setValue] = useState('')
    const [id, setId] = useState(0)

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
                    <div className='d-flex justify-content-center'>
                        <Row>
                            <LightMauveButton className='mb-3'>
                            <Input
                                type='file'
                                accept="image/png, image/jpeg"
                                onChange={(e) => setValue(e.target.files[0])}
                                required />
                            </LightMauveButton>
                            <LightMauveButton
                                className='ml-1 mb-3 ladda-button'
                                data-style='expand-right'
                                id='addPhotoButton'
                                type="submit">
                                Upload Photo
                            </LightMauveButton>
                        </Row>
                    </div>
                </form>
            </Col>
        </Row>
    )
}
