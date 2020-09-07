import { connect } from 'react-redux'

import { saveTag } from '../../tags/actions'
import { Tags } from '../components'

const mapStateToProps = (state, props) => {
    const { photoId } = props
    const photo = state.photo.photos[photoId]
    let tags = []

    if (typeof photo !== 'undefined') {
        photo.tags.forEach(tagId => {
            tags.push(state.tag.tags[tagId])
        })
    }

    return {
        tags: tags
    }
}

export const TagsContainer = connect(mapStateToProps)(Tags)
