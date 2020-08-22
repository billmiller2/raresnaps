import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { PhotoContainer } from '../'

export const ViewPhoto = () => {
    return (
        <Row>
            <Col xs={12} md={6}>
                <PhotoContainer />
            </Col>
        </Row>
    )
}
