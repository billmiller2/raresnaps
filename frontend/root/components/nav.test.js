import React from 'react'
import BootstrapNav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import Navbar from 'react-bootstrap/Navbar'
import { act, screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Item, MauveNav, Nav } from './nav.jsx'
import { ADD_PHOTO_ROUTE } from '../../photos'
import { LOGOUT_ROUTE } from '../../users'

describe('Nav', () => {
    it('renders a navbar with the raresnaps brand', () => {
        const { queryByText } = render(<Nav />)

        expect(queryByText('raresnaps')).toBeTruthy()
    })

    it('renders a dropdown button with the username', () => {
        const username = 'bill'
        const { queryByText } = render(<Nav username={username} />)

        expect(queryByText(username)).toBeTruthy()
    })

    it('renders a expands the dropdown when the username button is clicked', () => {
        const username = 'bill'
        const { queryByText } = render(<Nav username={username} />)

        const dropdown = queryByText(username)

        expect(queryByText('Add Photo')).toBeFalsy()
        expect(queryByText('View Tags')).toBeFalsy()
        expect(queryByText('Logout')).toBeFalsy()

        fireEvent.click(dropdown)

        expect(queryByText('Add Photo')).toBeTruthy()
        expect(queryByText('View Tags')).toBeTruthy()
        expect(queryByText('Logout')).toBeTruthy()
    })
})
