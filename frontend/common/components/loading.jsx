import React from 'react'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import styled from 'styled-components'

export const MauveSpinner = styled(Spinner)`
    color: #a17188;
`

export const Loading = () => (
    <Row className="justify-content-center mt-5">
        <MauveSpinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </MauveSpinner>
    </Row>
)
