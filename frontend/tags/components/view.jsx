import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchTags, Tag, selectTag } from '../'

export const ViewTags = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTags())
    }, [])

    const tags = useSelector(state => state.tag.tags)
    const dispatchSelectTag = (tagId) => dispatch(selectTag(tagId))

    return Object.values(tags)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(tag => <Tag key={tag.name} onClick={dispatchSelectTag} tag={tag} />)
}
