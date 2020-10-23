import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'

import { Tag } from './tag.jsx'
import { decodeHtml, LightMauveButton } from '../../common'

describe('Tag', () => {
    it('renders a Link containing a LightMauveButton', () => {
        const tag = { _id: 'asdf', name: 'aaron' }
        const wrapper = shallow(<Tag tag={tag} />)

        expect(wrapper.find(Link).length).toEqual(1)
        expect(wrapper.find(LightMauveButton).length).toEqual(1)
    })

    it('renders the tag name from props', () => {
        const tag = { _id: 'asdf', name: 'aaron' }
        const wrapper = shallow(<Tag tag={tag} />)

        expect(wrapper.find(LightMauveButton).text()).toBe('aaron')
    })

    it('renders an X if dismissible', () => {
        const tag = { _id: 'asdf', name: 'aaron' }
        const wrapper = shallow(<Tag tag={tag} dismissible={true} />)

        expect(wrapper.find(LightMauveButton).text()).toBe(decodeHtml('&#10006;  ') + 'aaron')
    })

    it('does not render if tag is undefined', () => {
        const wrapper = shallow(<Tag />)

        expect(wrapper.find(Link).length).toEqual(0)
    })
})
