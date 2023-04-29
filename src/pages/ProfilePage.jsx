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
        { user !== null && 
            <>
                { user.owner_email ? (

                    <Business user={user} key={user.id}/>

                ) : null }

                { user.email ? (
                    
                    <Dependent user={user} key={user.id}/>

                ) : null }
            
            </>        
        }
        </>
    )
}