import { Link } from "react-router"

const Landing = () => {       
    return (
        <div>
            <p><Link to="/login">Have An Account? Log In Here</Link></p>
            <p><Link to="/signup">No Accounts? Sign Up Here</Link></p>
        </div>
    )
}

export default Landing