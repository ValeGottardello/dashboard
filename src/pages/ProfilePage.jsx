import { useEffect} from "react"
import Business from "../components/Business"
import Dependent from "../components/Dependet"
// import { login } from "../utils/dependent"
import { getUser } from "../utils/users_service"


export default function ProfilePage({ user , onLogIn, onSetUser }) {

    useEffect(() => {
        onLogIn(getUser())  
    }, [])
 
    return(
        <>
        { user && 
            <>
                { user.email && (
                     
                     <Dependent user={user} key={user.id} onSetUser={onSetUser} />
                     
                )}  
                {user.owner_email && (
         
                    <Business user={user} key={user.id}/>

                )}
            </>        
        }
        </>
    )
}