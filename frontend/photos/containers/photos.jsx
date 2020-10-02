import { connect } from 'react-redux'

import { fetchPhotos } from '../../photos/actions'
import { Photos } from '../components'

const mapStateToProps = (state) => {
    const { since } = state.photo
    const { selected } = state.tag

    let tag = ''

    if (typeof state.tag.tags[selected] !== 'undefined') {
        tag = state.tag.tags[selected]
    }

    return {
        since,
        selected,
        tag
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
