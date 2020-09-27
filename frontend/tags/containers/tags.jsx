import { connect } from 'react-redux'

import { Tags, selectTag } from '../'

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
        tags
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectTag: (tagId) => dispatch(selectTag(tagId))
    }
}

export const TagsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Tags)
