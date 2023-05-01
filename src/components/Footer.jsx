import { BsGithub,BsTwitter,BsFacebook } from "react-icons/bs";
import '../css/Footer.css'

export default function Footer() {
    return ( 
        <footer className="info">
            <span>&copy; 2023 M.V.Gott</span>
            <ul>
                <li> <a href="https://github.com/ValeGottardello"><BsGithub/></a> </li>
                <li> <a href="https://twitter.com"><BsTwitter/></a></li>
                <li> <a href="https://facebook.com"><BsFacebook/></a></li>
            </ul>
        </footer>
    )
}