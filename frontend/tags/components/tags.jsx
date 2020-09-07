import React from 'react'

import { Tag } from './'

export const Tags = (props) => {
    const { tags } = props
    let tagComponents = []

    tags.forEach(tag => {
        tagComponents.push(
            <Tag key={tag.name} tag={tag} />
        )
    })

    return (
        <>{tagComponents}</>
    )
}
