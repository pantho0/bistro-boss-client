import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import useAxiosPublic from "../Components/Hooks/useAxiosPublic";

export const AuthContext = createContext(null)

const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider()
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }
    const signInWithGoogle = () =>{
       return signInWithPopup(auth, provider)
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    useEffect(()=>{
       const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            console.log('logged User : ', currentUser);
            const userInfo = {email : currentUser?.email}
            if(currentUser){    
                axiosPublic.post('/jwt', userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
            }else{
                // TODO : Remove access token
                localStorage.removeItem('access-token')     
            }
            setLoading(false)
        });
        return ()=>{
            unSubscribe()
        }
    },[])


    const authInfo = {
        user,
        loading,
        createUser, 
        signIn,
        updateUserProfile,
        signInWithGoogle,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;