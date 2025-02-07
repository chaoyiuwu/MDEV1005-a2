import { useState } from 'react'
import { Button, Group, Stack, TextInput, Text } from '@mantine/core'
import { useNavigate, Link } from 'react-router'
import { firebaseSignIn } from '../../firebase/FirebaseService'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleLogin = async (e: any) => {
    e.preventDefault()
    setError('') // Reset error state
    setSuccess(false) // Reset success state

    try {
        await firebaseSignIn({ email, password})
        setSuccess(true) // Set success state
        navigate("/dashboard")
    } catch (error: any) {
        setError(error.message) // Set error message
    }
  }

    return (
    <div className='flex h-screen'>
        <div className='flex flex-col m-auto w-full items-center'>
            <h1 className='my-4'>Log In</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Login successful!</p>}
            <form onSubmit={handleLogin}>
                <Stack gap='md'>
                    <TextInput
                    label="Email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <TextInput
                    label="Password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <Group justify="center"><Button variant="filled" color="red" type="submit">Log In</Button></Group>
                </Stack>
        </form>
        <Link to='/signup' className='my-4'><Text c='dimmed' size='sm'>No Accounts? Sign Up Instead</Text></Link>
        </div>
    </div>
    )
}

export default Login