import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './store'
import { RootContainer } from './root/containers'

render(
    <Provider store={store}>
        <RootContainer />
    </Provider>,
    document.getElementById('app')
)
