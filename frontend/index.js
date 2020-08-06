import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from './store'
import { RootContainer } from './root/containers'

render(
    <Provider store={store}>
        <BrowserRouter>
            <RootContainer />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
)
