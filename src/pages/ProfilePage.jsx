import { useEffect } from "react"
import Business from "../components/Business"
import Dependent from "../components/Dependet"
import { getUser } from "../utils/users_service"


export default function ProfilePage({ user , onLogIn }) {
    
    useEffect(() => {
        onLogIn(getUser())  
    }, [])

    return(
        <>
        { user && 
            <>
                { user.email ? (
                     
                     <Dependent user={user} key={user.id}/>
                     
                ) : (
         
                    <Business user={user} key={user.id}/>

                )}
            </>        
        }
        </>
    )
}