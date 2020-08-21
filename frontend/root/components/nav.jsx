import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import BootstrapNav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import styled from 'styled-components'

import { ADD_PHOTO_ROUTE } from '../../photos'
import { LOGOUT_ROUTE } from '../../users'

const MauveNav = styled(Navbar)`
    background-color: #a17188;
`

export const Nav = (props) =>
    <MauveNav expand='lg'>
        <Navbar.Brand href='/' style={{color: '#ffffff'}}>
            raresnaps
        </Navbar.Brand>
        <BootstrapNav className='ml-auto'>
            <Dropdown>
                <Dropdown.Toggle style={{
                    backgroundColor: '#a17188',
                    borderColor: 'white'
                }}>
                    { props.username }
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href={ ADD_PHOTO_ROUTE }>
                        Add Photo
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href={ LOGOUT_ROUTE }>
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </BootstrapNav>
    </MauveNav>
