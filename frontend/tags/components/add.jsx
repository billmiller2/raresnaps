import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Ladda from 'ladda'

import { getSuggestions, Input, LightMauveButton, Suggest } from '../../common'
import { saveTag } from '../../tags/actions'

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
                id='addTagButton'
                type="submit">
                Add Tag
            </LightMauveButton>
            <Suggest
                input={tag}
                suggestions={suggestedTags}
                setInput={setTag}
                setSuggestions={setSuggestedTags} />
        </form>
    )
}
