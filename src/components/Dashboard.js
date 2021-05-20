import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Card, Button, Alert } from 'react-bootstrap'
import AppContainer from './AppContainer'


const Dashboard = () => {

    const [ error, setError ] = useState()
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.pushState('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <AppContainer>
            <div className='w-100' style={{ maxWidth: '400px' }}>
                <Card>
                    <Card.Body>
                        <h2>Profile</h2>
                        <p>{currentUser.displayName ? `Name: ${currentUser.displayName}` : 'Annonymous '}</p>
                        {currentUser.photoURL ? <img src={currentUser.photoURL} /> : <p>no img selected</p>}
                        <p>{error && <Alert variant='danger'>{error}</Alert>}</p>
                        <strong>Email:</strong> {currentUser.email}
                        <p><Link to='/profile'>Customize Profile</Link></p>
                    </Card.Body>
                </Card>
                <Button variant='link' onClick={handleLogout}>
                    Log out
                </Button>
            </div>
        </AppContainer>
    )
}

export default Dashboard
