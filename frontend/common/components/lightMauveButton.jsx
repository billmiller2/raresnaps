import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

export const LightMauveButton = styled(Button)`
    background-color: #ffffff;
    border: 1px solid;
    color: #a17188;
    &:hover {
        background-color: #a17188;
        color: #ffffff;
        border-color: #a17188;
        box-shadow: 0 0 10px !important;
    }
    &:active {
        &:focus {
            background-color: #a17188 !important;
            box-shadow: 0 0 10px !important;
        }
        background-color: #a17188 !important;
        border: 1px solid !important;
        color: #a17188 !important;
        box-shadow: 0 0 10px !important;
    }
    &:focus {
        background-color: #a17188 !important;
        border: 1px solid !important;
        color: #ffffff !important;
        box-shadow: 0 0 10px !important;
    }
`
