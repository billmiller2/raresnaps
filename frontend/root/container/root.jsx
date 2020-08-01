import { connect } from 'react-redux'

import { requestUser } from '../action/creator'
import { RootComponent } from '../component/rootComponent.jsx'

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    // dispatch(requestUser())

    return {}
}

export const RootContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RootComponent)
