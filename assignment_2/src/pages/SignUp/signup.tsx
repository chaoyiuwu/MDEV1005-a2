import { useState } from 'react';
import { Button, Group, TextInput } from '@mantine/core'
import { useNavigate } from 'react-router'
import { firebaseSignUp } from '../../firebase/FirebaseService'

const SignUp = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSignUp = async (e: any) => {
        e.preventDefault()
        setError('') // Reset error state
        setSuccess(false) // Reset success state

        try {
            await firebaseSignUp({ email, password, displayName: name })
            setSuccess(true) // Set success state
            navigate("/dashboard")
        } catch (error: any) {
            setError(error.message) // Set error message
        }
    }
  return (
    <div className='flex h-screen'>
        <div className='flex flex-col m-auto w-full items-center'>
            <h1 className='my-4'>Sign Up</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Sign-up successful!</p>}
            <form onSubmit={handleSignUp}
            className='w-64 items-center'>
                <TextInput
                    withAsterisk
                    label="Display Name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <Button className='my-4' variant="filled" color="red" type="submit"> Sign Up</Button>
                </Group>
            </form>
        </div>
    </div>
  )
}

export default SignUp
