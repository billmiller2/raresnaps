import { connect } from 'react-redux'

import { requestUser } from '../action/creator'
import { RootComponent } from '../component/rootComponent.jsx'

const mapStateToProps = (state) => {
    console.log(state)
    return state
}

const mapDispatchToProps = (dispatch) => {
    dispatch(requestUser)
}

export const RootContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RootComponent)
