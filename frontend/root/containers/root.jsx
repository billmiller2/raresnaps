import { connect } from 'react-redux'

import { requestUser } from '../../users/actions'
import { requestPhoto } from '../../photos/actions'
import { RootComponent } from '../components'

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    dispatch(requestUser())
    dispatch(requestPhoto())

    return {}
}

export const RootContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RootComponent)
