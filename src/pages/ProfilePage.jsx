export default function ProfilePage(user) {

    console.log(user)
    return(
        <>
        { user && 
            <div>
                profile page
            {/* //if user is owner render owner component
            //if user is manager render manager component
            //if user is employee render employee component */}
            </div>
        }
        </>
    )
}