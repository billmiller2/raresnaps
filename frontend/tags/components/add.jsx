import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Ladda from 'ladda'
import styled from 'styled-components'

import { Input, LightMauveButton } from '../../common'
import { saveTag } from '../../tags/actions'

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

export const AddTag = (props) => {
    const { photoId } = props
    const [tag, setTag] = useState('')
    const [suggestedTags, setSuggestedTags] = useState([])

    const dispatch = useDispatch()
    const onSubmit = (tag, photoId) => dispatch(saveTag(tag, photoId))
    const tags = useSelector(state => state.tag.tags)

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                const submit = Ladda.create(document.querySelector('#addTagButton'))
                submit.start()

                return onSubmit(tag.trim(), photoId)
                    .then(() => {
                        submit.stop()
                        submit.remove()
                        setTag('')
                    })
            }}>
            <Input
                className='mr-2'
                id='tagInput'
                onChange={(e) => {
                    setSuggestedTags(
                        Object.values(tags)
                            .filter(tag => tag.name.startsWith(e.target.value.toLowerCase()))
                            .slice(0, 3)
                    )
                    setTag(e.target.value.trimLeft())
                }}
                required
                type='text'
                value={tag}>
            </Input>
            <LightMauveButton
                className='ladda-button'
                data-style='expand-right'
                id='addTagButton'
                type="submit">
                Add Tag
            </LightMauveButton>
            {tag !== '' && suggestedTags.length > 0 &&
                <Ul>
                    {suggestedTags.map(suggestedTag => {
                        return (
                            <Li className='text-left'
                                key={suggestedTag.name}
                                onClick={() => {
                                    setTag(suggestedTag.name)
                                    setSuggestedTags([])
                                }}>
                                {suggestedTag.name}
                            </Li>
                        )
                    })}
                </Ul>
            }
        </form>
    )
}
