import { connect } from 'react-redux'

import { fetchPhotos } from '../../photos/actions'
import { Photos } from '../components'

const mapStateToProps = (state) => {
    const { cursor } = { ...state.photo }

    return {
        cursor: cursor
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPhotos: (cursor) => dispatch(fetchPhotos(cursor))
    }
}

export const PhotosContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Photos)
