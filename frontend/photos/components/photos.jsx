import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { Photo } from './'

export const Photos = (props) => {
    const { photos, isFetching } = { ...props }

    if (isFetching) {
        return <span>Loading</span>
    }

    let photoComponents = []

    photos.forEach((photo, i) => photoComponents.push(
        <Col xs={12} md={4}>
            <Photo key={i} photo={photo} />
        </Col>
    ))

    return (
        <Row className='d-flex flex-wrap align-items-center'>
            { photoComponents }
        </Row >
    )
}
