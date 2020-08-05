import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { RootContainer } from './root/containers'

export const App = () =>
    <Switch>
        <Route path='/'>
            <RootContainer />
        </Route>
    </Switch>
