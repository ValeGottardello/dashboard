export default function CheckValidPassword (input) {

    let validPassword = { status : "" }

    if (input.length < 6){
        validPassword.status = "weak" 
    } else if (input.length >= 6 && input.length <= 12 ){
        validPassword.status =  "medium"
    } else if (input.length >= 13){
        validPassword.status =  "strong"
    } else {
        validPassword.status =  "" 
    }

    return validPassword
}