import { connect } from 'react-redux'

import { requestUser } from '../../users/actions/creators'
import { requestPhoto } from '../../photos/actions/creators'
import { RootComponent } from '../component/root.jsx'

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
