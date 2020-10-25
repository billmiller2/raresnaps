import React from 'react'
import { shallow } from 'enzyme'

import { AddTag } from './add.jsx'
import { Input, LightMauveButton } from '../../common'

describe('Add Tag', () => {
    it('renders a form containing an Input and a LightMauveButton', () => {
        const wrapper = shallow(<AddTag />)

        expect(wrapper.find('form').length).toEqual(1)
        expect(wrapper.find(Input).length).toEqual(1)
        expect(wrapper.find(LightMauveButton).length).toEqual(1)
    })
})
