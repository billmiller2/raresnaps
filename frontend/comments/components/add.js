import React, { useState } from 'react'
import * as Ladda from 'ladda'

import { TextArea, LightMauveButton } from '../../common'

export const AddComment = (props) => {
    const { onSubmit, photoId } = props
    const [comment, setComment] = useState('')

    return (
        <form 
            onSubmit={(e) => {
                e.preventDefault()
                const submit = Ladda.create(document.querySelector('#addCommentButton'))
                submit.start()

                return onSubmit(comment.trim(), photoId)
                    .then(() => {
                        submit.stop()
                        submit.remove()
                        setComment('')
                    })
            }}>
            <TextArea
                className='mr-2'
                onChange={(e) => setComment(e.target.value.trimLeft())}
                required
                value={comment}>
            </TextArea>
            <LightMauveButton 
                className='ladda-button mt-2 float-right'
                data-style='expand-right'
                id='addCommentButton' 
                type="submit">
                Add Comment
            </LightMauveButton>
        </form>
    )
}

