import { Link } from 'react-router'

const Landing = () => {       
    return (
        <div className='flex h-screen'>
            <div className="m-auto">
                <p><Link to="/login">Have An Account? Log In Here</Link></p>
                <p><Link to="/signup">No Accounts? Sign Up Here</Link></p>
            </div>
        </div>
    )
}

export default Landing