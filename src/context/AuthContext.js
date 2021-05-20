import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, getFirestore } from '../firebase'

const AuthContext = createContext()

const { Provider } = AuthContext

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [ currentUser, setCurrentUser ] = useState()
    const [ avatars, setAvatars ] = useState([])
    const [ loading, setLoading ] = useState(true)

    function signup( email, password ) {
        return auth.createUserWithEmailAndPassword( email, password )
    }

    function login( email, password ) {
        return auth.signInWithEmailAndPassword( email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function update(displayName, photoURL) {
        const user = auth.currentUser
        return user.updateProfile({
            displayName, 
            photoURL
        })
    }

    useEffect(() => {
        const db = getFirestore()
        const avatars = db.collection('avatars')
        const query = avatars.get()
        query.then((res)=>{
            res.docs.forEach((doc)=>{
                setAvatars(avatars => [...avatars, {...doc.data() , id: doc.id}])
            })
        })
    }, [])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        avatars,
        currentUser,
        login,
        signup,
        logout,
        update
    }

    return (
        <Provider value={value}>
            {!loading && children}
        </Provider>
    )
}