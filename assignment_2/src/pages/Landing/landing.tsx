import { Image, Text } from '@mantine/core'
import { Link } from 'react-router'
import bookImage from '../../assets/book_png_by_Vecteezy.com.png'

const Landing = () => {       
    return (
        <div className='flex h-screen'>
            <div className="m-auto">
                <Image radius='md' src={bookImage} h={200} w='auto' />
                <Text size='lg' ta='center'><Link to="/login">Have An Account? Log In Here</Link></Text>
                <Text size='lg' ta='center'><Link to="/signup">No Accounts? Sign Up Here</Link></Text>
            </div>
        </div>
    )
}

export default Landing