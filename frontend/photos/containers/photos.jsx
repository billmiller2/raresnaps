import { connect } from 'react-redux'

import { fetchPhotos } from '../../photos/actions'
import { Photos } from '../components'

const mapStateToProps = (state) => {
    const { since } = { ...state.photo }

    return {
        since: since
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPhotos: (since) => dispatch(fetchPhotos(since))
    }
}

export const PhotosContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Photos)
