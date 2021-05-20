import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import AppContainer from './AppContainer'

const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError("Failed to sign in")
        }
        setLoading(false)
    }

    return (
        <AppContainer>
            <div className='w-100' style={{ maxWidth: '400px' }}>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Log In!</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' ref={passwordRef} required />
                            </Form.Group>
                            <Button disabled={loading} className='w-100' type='submit'>
                                Lets go!
                            </Button>
                        </Form>
                    </Card.Body>
                    
                </Card>
                <div className='w-100 text-center mt-2 mb-3'>
                    Don't have an account? <Link to='/signup'>Sign Up</Link>
                </div>
            </div>
        </AppContainer>
    )
}

export default Login