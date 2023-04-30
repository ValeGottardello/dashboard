import { useEffect } from "react"
import '../css/Profile.css'

export default function DetailsBusiness (user) {
    console.log(user.user)
    useEffect(() => {}, [user])
    return (
        <header>
            <div>
                <img className="profile-pic" src="https://images.pexels.com/photos/15443094/pexels-photo-15443094.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="" />
            </div>
            <div>
                <h2>{user.user.name}</h2>
                <h4>{user.user.owner_email}</h4>
            </div>
            <div>
                {/* <button> Confirm </button> */}
            </div>
            <div>
                {/* <Button variant="secondary" size="sm" active>
                    EDIT PHOTO
                </Button> */}
            </div>
        </header>
    )
}