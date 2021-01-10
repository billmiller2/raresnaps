import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Ladda from 'ladda'
import styled from 'styled-components'

import { searchTag } from '../'
import { Form, getSuggestions, Input, LightMauveButton, Suggest } from '../../common'

export const SearchTag = (props) => {
    const [tag, setTag] = useState('')
    const [suggestedTags, setSuggestedTags] = useState([])
    const dispatch = useDispatch()
    const tags = useSelector(state => state.tag.tags)

    return (
        <Form
            className='mr-2'
            onSubmit={(e) => {
                e.preventDefault()
                const submit = Ladda.create(document.querySelector('#searchTagButton'))
                submit.start()

                return dispatch(searchTag(tag.trim()))
                    .then(() => {
                        submit.stop()
                        submit.remove()
                        setTag('')
                    })
            }}>
            <Input
                className='mr-2'
                data-testid='searchTagInput'
                onChange={(e) => {
                    setSuggestedTags(getSuggestions(tags, e.target.value))
                    setTag(e.target.value.trimLeft())
                }}
                required
                type='text'
                value={tag}>
            </Input>
            <LightMauveButton
                className='ladda-button'
                data-style='expand-right'
                id='searchTagButton'
                type="submit">
                Search Tag
            </LightMauveButton>
            <Suggest
                input={tag}
                suggestions={suggestedTags}
                setInput={setTag}
                setSuggestions={setSuggestedTags} />
        </Form>
    )
}
