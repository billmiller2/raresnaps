import React from 'react'

import { Tag } from './tag.jsx'

export const Tags = (props) => {
    const { tags, selectTag } = props

    return (tags && tags.length > 0) &&
        <>
        {tags.map(tag => <Tag key={tag._id} tag={tag} onClick={selectTag} />)}
        </>
}
