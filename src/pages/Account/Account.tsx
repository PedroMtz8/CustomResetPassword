import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthProvider"
import { DocumentData, collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../../config/firebaseConfig/firebaseConfig"
import { Button} from "@chakra-ui/react"
        


export default function Account(){
    const [userInfo, setUserInfo] = useState<DocumentData>()

    // console.log(userInfo)
    const authContext = useAuth()
    if(!authContext) return null
    const {user, loadingUser, logOut} = authContext

    async function getUserInfo(){
        const userRef = doc(db, "/users/" + user?.uid)
        const res = await getDoc(userRef)
        const data = res.data()
        setUserInfo(data)
        return data
    }

    useEffect(()=>{
        if(!loadingUser){
            getUserInfo()
        }
    },[loadingUser])

    return(
        <>
            <div>
                <h1>Tu nombre es: {loadingUser ? "Cargando..": userInfo?.username } </h1>
                <p>Tu correo es: {loadingUser ? "Cargando..": userInfo?.email} </p>
                <Button onClick={logOut} >Log Out</Button>
            </div>
        </>
    )
}


