import React from 'react'
import BootstrapNav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import Navbar from 'react-bootstrap/Navbar'

import { shallow } from 'enzyme'

import { Item, MauveNav, Nav } from './nav.jsx'
import { ADD_PHOTO_ROUTE } from '../../photos'
import { LOGOUT_ROUTE } from '../../users'

describe('Nav', () => {
    it('renders a MauveNav containing a Navbar.Brand', () => {
        const wrapper = shallow(<Nav />)

        expect(wrapper.find(MauveNav).length).toEqual(1)
        expect(wrapper.find(Navbar.Brand).length).toEqual(1)
    })

    it('renders a BootstrapNav containing a Dropdown', () => {
        const wrapper = shallow(<Nav />)

        expect(wrapper.find(BootstrapNav).length).toEqual(1)
        expect(wrapper.find(BootstrapNav).children(Dropdown).length).toEqual(1)
    })

    it('renders a Dropdown containing a toggle and a menu', () => {
        const wrapper = shallow(<Nav />)

        expect(wrapper.find(Dropdown).children(Dropdown.Toggle).length).toEqual(1)
        expect(wrapper.find(Dropdown).children(Dropdown.Menu).length).toEqual(1)
    })

    it('renders a Dropdown Menu containing an add photo link and a logout link', () => {
        const wrapper = shallow(<Nav />)

        expect(wrapper.find(Dropdown.Menu).children(Item).length).toEqual(2)
        expect(wrapper.find(Dropdown.Menu).children(Item).first().prop('href'))
            .toEqual(ADD_PHOTO_ROUTE)
        expect(wrapper.find(Dropdown.Menu).children(Item).last().prop('href'))
            .toEqual(LOGOUT_ROUTE)
    })
})
