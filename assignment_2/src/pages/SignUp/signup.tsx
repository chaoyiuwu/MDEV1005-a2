import { useState } from 'react';
import { Button, Fieldset, Field, Input, Label, Legend } from '@headlessui/react'
import { useNavigate } from 'react-router';
import { firebaseSignUp } from '../../firebase/FirebaseService';

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    setError(''); // Reset error state
    setSuccess(false); // Reset success state

    try {
        await firebaseSignUp({ email, password, displayName: name });
        setSuccess(true); // Set success state
        navigate("/dashboard");
    } catch (error: any) {
        setError(error.message); // Set error message
    }
  };

  return (
    <div>
        <h1>Sign Up</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>Sign-up successful!</p>}
        <form onSubmit={handleSignUp}>
            <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
                <Field style={{padding: 20}}>
                    <Label>Name</Label>
                    <Input
                    type="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </Field>
                <Field style={{padding: 20}}>
                    <Label>Email</Label>
                    <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </Field>
                <Field style={{padding: 20}}>
                    <Label>Password</Label>
                    <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </Field> 
            <Button className="rounded bg-sky-600 text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
            type="submit">Sign Up</Button>
            </Fieldset>
        </form>
    </div>
  );
};

export default SignUp;
