import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import {DocumentData, doc, setDoc} from "firebase/firestore"
import { User, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig/firebaseConfig";
import { useToast } from "@chakra-ui/react"

type TContextProps = {
    user: User | null
    loadingUser: boolean
    signUp: ({email, password, username}: {email: string, password: string, username: string}) => void
    login: ({email, password}: {email: string, password: string}) => void 
    logOut: () => Promise<void>
    forgotPassword: (email: string) => void
    setResponse: any
}
const authContext = createContext<TContextProps | null>(null)

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw new Error("There is no auth Context")
    return context
}


export default function AuthProvider({children}: {children: ReactNode}){
    const [user, setUser] = useState<User | null>(null)
    const [loadingUser, setLoadingUser] = useState(true);
    const [response, setResponse] = useState()
    console.log(response)

    const toast = useToast()
    const navigate = useNavigate()

    const signUp = async (
        {username, email, password}: 
        {username: string, email: string, password: string}) => {

        let infoUser = await createUserWithEmailAndPassword(auth, email, password).then(userFirebase => userFirebase)
        const docRef = doc(db, `/users/${infoUser.user.uid}`);

        await setDoc(docRef, {
            username,
            email
        })
    }

    const login = async({email, password}:{email: string, password: string}) => {
        let infoUser = await signInWithEmailAndPassword(auth, email, password)
        navigate("/account")
    }

    const logOut = async () => {
        await signOut(auth);
        toast({
            description: "Has cerrado sesión",
            status: "info",
            position: "top",
            duration: 3000,
            isClosable: true
        })
    };

    function forgotPassword(email: string) {
        console.log("Email sent")
        return sendPasswordResetEmail(auth, email)
    }



    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoadingUser(false);
        });
    }, []);

    return (
        <authContext.Provider
            value={{ user, loadingUser, signUp, login, logOut, forgotPassword, setResponse }}
        >
            {children}
        </authContext.Provider>
    );
} 

