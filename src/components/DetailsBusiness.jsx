import { useEffect } from "react"
import '../css/Profile.css'
import { AiOutlineUser } from "react-icons/ai";

export default function DetailsBusiness ({user}) {
    useEffect(() => {}, [user])
    return (
        <section className="business-details">
            <div>
                <AiOutlineUser className='icon'/>
            </div>
            <div>
                <h2>{user.name}</h2>
                <h4>{user.owner_email}</h4>
            </div>
        </section>
    )
}