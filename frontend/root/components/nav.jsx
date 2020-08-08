import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

import { AddPhotoContainer } from '../../photos/containers'

export const Nav = (props) =>
    <nav
        className='navbar navbar-light'
        style={{backgroundColor: '#a17188'}}>
        <a className='navbar-brand' style={{color: '#ffffff'}}>
            raresnaps
        </a>
        <AddPhotoContainer />
        <Dropdown>
            <Dropdown.Toggle style={{
                backgroundColor: '#a17188',
                borderColor: 'white'
            }}>
                { props.username }
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href='/users/logout'>
                    Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </nav>
