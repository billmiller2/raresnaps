import { connect } from 'react-redux'

import { fetchPhotos } from '../../photos/actions'
import { Photos } from '../components'

const mapStateToProps = (state) => {
    const { since } = state.photo
    const { selected } = state.tag

    let tags = []

    selected.forEach(tagId => {
        if (typeof state.tag.tags[tagId] !== 'undefined') {
            tags.push(state.tag.tags[tagId])
        }
    })

    return {
        since,
        selected,
        tags
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPhotos: (since, tagId) => dispatch(fetchPhotos(since, tagId))
    }
}

export const PhotosContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Photos)
