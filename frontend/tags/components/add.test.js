import React from 'react'
import { shallow } from 'enzyme'

import { AddTag } from './add.jsx'
import { Input, LightMauveButton } from '../../common'

describe('Add Tag', () => {
    beforeEach(() => {
        const button = document.createElement('button')
        button.setAttribute('id', 'addTagButton')
        document.body.appendChild(button)
    })

    afterEach(() => {
        const button = document.getElementById('addTagButton')

        if (button) {
            document.body.removeChild(button)
        }
    })

    it('renders a form containing an Input and a LightMauveButton', () => {
        const onSubmit = () => {}
        const wrapper = shallow(<AddTag onSubmit={onSubmit} />)
        const form = wrapper.find('form')

        expect(form.length).toEqual(1)
        expect(form.children(Input).length).toEqual(1)
        expect(form.children(LightMauveButton).length).toEqual(1)
    })

    it('calls onSubmit when submitted', () => {
        const onSubmit = jest.fn((tag, photoId) => Promise.resolve())
        const wrapper = shallow(<AddTag onSubmit={onSubmit} />)
        const form = wrapper.find('form')

        form.simulate('submit', {
            preventDefault: () => {}
        })

        expect(onSubmit).toBeCalled()
    })
})
