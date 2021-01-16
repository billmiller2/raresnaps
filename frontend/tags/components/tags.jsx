import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Tag } from './tag.jsx'
import { selectTag } from '../'

export const Tags = (props) => {
    const { photoId } = props

    const tags = useSelector(state => {
        const photo = state.photo.photos[photoId]
        let tags = []

        if (typeof photo !== 'undefined') {
            photo.tags.forEach(tagId => {
                tags.push(state.tag.tags[tagId])
            })
        }

        return tags
    })

    const dispatch = useDispatch()
    const dispatchSelectTag = (tagId) => dispatch(selectTag(tagId))

    return (tags && tags.length > 0) &&
        <>
        {tags.map(tag => <Tag key={tag._id} tag={tag} onClick={dispatchSelectTag} />)}
        </>
}
