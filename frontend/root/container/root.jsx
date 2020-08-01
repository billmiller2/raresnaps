import { connect } from 'react-redux'

import { requestUser } from '../../users/actions/creators'
import { RootComponent } from '../component/rootComponent.jsx'

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    dispatch(requestUser())

    return {}
}

export const RootContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RootComponent)
