import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Ladda from 'ladda'

import { Input, LightMauveButton } from '../../common'
import { saveTag } from '../../tags/actions'

export const AddTag = (props) => {
    const { photoId } = props
    const [tag, setTag] = useState('')

    const dispatch = useDispatch()
    const onSubmit = (tag, photoId) => dispatch(saveTag(tag, photoId))

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
                onChange={(e) => setTag(e.target.value.trimLeft())}
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
        </form>
    )
}
