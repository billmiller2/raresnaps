import { connect } from 'react-redux'

import { fetchUser } from '../../users/actions'
import { fetchPhotos } from '../../photos/actions'
import { RootComponent } from '../components'

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    dispatch(fetchUser())
    dispatch(fetchPhotos())

    return {}
}

export const RootContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RootComponent)
