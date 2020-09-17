import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { LightMauveButton } from '../../common'

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
                        e.preventDefault()

                        return onSubmit(file)
                            .then((action) => {
                                setId(Object.keys(action.payload.photos)[0])
                            })
                    }}>
                    <div className='d-flex justify-content-center'>
                        <LightMauveButton>
                        <input
                            type='file'
                            accept="image/png, image/jpeg"
                            onChange={(e) => setValue(e.target.files[0])}
                            required />
                        </LightMauveButton>
                        <LightMauveButton className='ml-1' type="submit">
                            Upload Photo
                        </LightMauveButton>
                    </div>
                </form>
            </Col>
        </Row>
    )
}
