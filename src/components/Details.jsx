import '../css/Profile.css'
import { useEffect } from 'react'

export default function Details (user) {
    console.log(user.user)
    useEffect(() => {}, [user])
    return (
        <section>
            <div>
                <img className="profile-pic" src="https://images.pexels.com/photos/15443094/pexels-photo-15443094.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="" />
            </div>
            <div>
                <h2>{user.user.user.name}</h2>
                <h4>{user.user.user.email}</h4>
            </div>
            <div>
                <h4>{user.user.user.position}</h4>
                <h4>{user.user.user.hours_available}h</h4>
            </div>
            <div>
                {/* business your are parte of */}
                {/* <button> Confirm </button> */}
            </div>
            <div>
                {/* <Button variant="secondary" size="sm" active>
                    EDIT PHOTO
                </Button> */}
            </div>
        </section>
    )
}