import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { AddTag } from './add.jsx'
import { Input, LightMauveButton } from '../../common'

const mockStore = configureStore()

describe('Add Tag', () => {
    it('renders a form containing an Input and a LightMauveButton', () => {
        const onSubmit = () => {}
        const store = mockStore({})

        render(
            <Provider store={store}>
                <AddTag onSubmit={onSubmit} />
            </Provider>
        )

        expect(screen.getByRole('button')).toHaveTextContent('Add Tag')
    })

    //it('calls onSubmit when submitted', () => {
        //const onSubmit = jest.fn((tag, photoId) => Promise.resolve())
        //const store = mockStore({})
        //render(
            //<Provider store={store}>
                //<AddTag onSubmit={onSubmit} />
            //</Provider>
        //)
    //})
})
