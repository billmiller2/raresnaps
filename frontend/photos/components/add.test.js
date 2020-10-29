import React from 'react'
import { shallow } from 'enzyme'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { AddPhoto } from './add.jsx'
import { LightMauveButton } from '../../common'

describe('Add Photo', () => {
    it('renders a Row containing a form containing a Row containing Col containing inputs', () => {
        const wrapper = shallow(<AddPhoto />)

        expect(wrapper.find(Row).length).toEqual(2)
        expect(wrapper.find(Col).length).toEqual(2)
        expect(wrapper.find('form').length).toEqual(1)
    })

    it('renders an input button and a submit button', () => {
        const wrapper = shallow(<AddPhoto />)

        expect(wrapper.find(LightMauveButton).length).toEqual(2)
    })
})
