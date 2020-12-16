import React from 'react'
import styled from 'styled-components'

const Ul = styled.ul`
    border 1px solid;
    color: #a17188 !important;
    list-style-type: none;
    max-width: 220px;
    padding-left: 0px;

    @media (max-device-width: 330px) {
        max-width: 55%;
    }
    @media (max-device-width: 700px) and (min-device-width: 330px) {
        max-width: 60%;
    }
`
const Li = styled.li`
    padding-bottom: 5px;
    padding-left: 10px;
    padding-top: 5px;

    &:hover {
        background-color: #a17188;
        color: #ffffff;
        border-color: #a17188;
        box-shadow: 0 0 10px !important;
    }
`

export const getSuggestions = (tags, input) => {
    return Object.values(tags)
        .filter(tag => tag.name.startsWith(input.toLowerCase()))
        .slice(0, 3)
}

export const Suggest = (props) => {
    const { input, suggestions, setInput, setSuggestions } = props

    if (input === '' || suggestions.length === 0) {
        return <div />
    }

    return (
        <Ul>
            {suggestions.map(suggestion => {
                return (
                    <Li className='text-left'
                        key={suggestion.name}
                        onClick={() => {
                            setInput(suggestion.name)
                            setSuggestions([])
                        }}>
                        {suggestion.name}
                    </Li>
                )
            })}
        </Ul>

    )
}
