import { useState } from 'react'
import { Button, Group, TextInput, Checkbox, Stack, Text } from '@mantine/core'
import { useNavigate, Link } from 'react-router'
import { firebaseSignUp } from '../../firebase/FirebaseService'

const SignUp = () => {
    const navigate = useNavigate() // using React Router's useNavigate hook to navigate the user without further input after a successful sign up
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    // an asynchronous function that interacts with firebase's functionality
    const handleSignUp = async (e: any) => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        try {
            await firebaseSignUp({ email, password, displayName: name })
            setSuccess(true)
            navigate("/dashboard")
        } catch (error: any) {
            setError(error.message) // error is displayed in red text on page
        }
    }

  return (
    <div className='flex h-screen'>
        <div className='flex flex-col m-auto w-full items-center'>
            <h1 className='my-4'>Sign Up</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Sign-up successful!</p>}        
            <form onSubmit={handleSignUp} className='items-center'>
                <Stack gap='mid'>
                    <TextInput
                        withAsterisk
                        label="Display Name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextInput
                        withAsterisk
                        label="Email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextInput
                        withAsterisk
                        label="Password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    <Checkbox defaultChecked label="I agree to sell my soul and my firstborn child"/>
                    <Group justify="center">
                        <Button variant="filled" color="red" type="submit"> Sign Up</Button>
                    </Group>
                </Stack>
            </form>
            <Link to='/login' className='my-4'><Text c='dimmed' size='sm'>Have an account? Log In Instead</Text></Link>

        </div>
    </div>
  )
}

export default SignUp
