import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import AppContainer from './AppContainer'
import { useHistory } from 'react-router-dom'

const Profile = () => {

    const displayName = useRef()
    const [photoURL, setPhotoURL] = useState()
    const { avatars, currentUser, update } = useAuth()
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()

    async function handleUpdate(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await update(displayName.current.value, photoURL)
            history.push('/')
        } catch {
            setError('Something went wrong!')
        }
    }

    useEffect(() => {
        console.log(photoURL)
    }, [photoURL])

    return (
        <AppContainer>
            <Card>
                <Card.Body className='d-flex flex-column'>
                    {error&& <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleUpdate}>
                        <Form.Group>
                            <Form.Label>Your email: </Form.Label> 
                            <Form.Control disabled={true} type='text' value={currentUser.email} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Display name: </Form.Label> 
                            <Form.Control type='text' ref={displayName} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Change avatar</Form.Label>
                            { avatars && 
                                avatars.map((avatar)=>{
                                    return (
                                            <img 
                                                key={avatar.id} 
                                                width='50px' 
                                                alt={avatar.id} 
                                                src={avatar.avatar} 
                                                onClick={(e)=> {
                                                    setPhotoURL(avatar.avatar)
                                                }}
                                            />
                                    )
                                })
                            }
                        </Form.Group>
                        <Button disabled={loading} type='submit'>
                            Save
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            
        </AppContainer>
    )
}

export default Profile
