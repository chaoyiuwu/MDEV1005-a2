import { useState } from 'react'
import { Button, Group, TextInput } from '@mantine/core'
import { useNavigate } from 'react-router'
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
            <h1>Log In</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Login successful!</p>}
            <form onSubmit={handleLogin}>
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
                <Group justify="center">
                <Button variant="filled" color="red" type="submit" style={{margin: 20}}>
                Log In</Button>
                </Group>
        </form>
        </div>
    </div>
    )
}

export default Login