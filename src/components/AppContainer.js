import React from 'react'
import { Container } from 'react-bootstrap'

const AppContainer = ({ children }) => {
    return (
        <Container 
            className='d-flex align-items-center justify-content-center'
            style={{ minHeight : '100vh' }}
        >
            { children }
        </Container>
    )
}

export default AppContainer
