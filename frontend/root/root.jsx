import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

export const Root = ()  => {
    return (
        <div className='container'>
            <nav
                className='navbar navbar-light'
                style={{backgroundColor: '#a17188'}}>
                <a className='navbar-brand' style={{color: '#ffffff'}}>
                    raresnaps
                </a>
                <Dropdown>
                    <Dropdown.Toggle style={{
                        backgroundColor: '#a17188',
                        borderColor: 'white'
                    }}>
                        User
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href='/users/logout'>
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </nav>
            <hr />
            <h1>
                raresnaps
            </h1>
        </div>
    )
}
