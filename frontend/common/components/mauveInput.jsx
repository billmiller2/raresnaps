import styled from 'styled-components'

export const Input = styled.input`
    color: #a17188 !important;
    padding: 3px;
    &:required {
        box-shadow: none;
    }
    &:focus {
        border-color: #ffffff !important;
        box-shadow: 0 0 5px !important;
        outline: none;
    }
    &::selection {
        background-color: #a17188;
        color: #ffffff;
    }
    @media (max-device-width: 330px) {
        max-width: 55%;
    }
    @media (max-device-width: 700px) and (min-device-width: 330px) {
        margin-top: 10px;
        max-width: 60%;
    }
`

export const TextArea = styled.textarea`
    color: #a17188 !important;
    padding: 3px;
    width: 100%;
    &:required {
        box-shadow: none;
    }
    &:focus {
        border-color: #ffffff !important;
        box-shadow: 0 0 5px !important;
        outline: none;
    }
    &::selection {
        background-color: #a17188;
        color: #ffffff;
    }
    @media (max-device-width: 700px) and (min-device-width: 330px) {
        margin-top: 10px;
    }
`
