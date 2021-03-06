import { connect } from 'react-redux'

import { fetchUser } from '../../users/actions'
import { RootComponent } from '../components'

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    dispatch(fetchUser())

    return {}
}

export const RootContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RootComponent)
