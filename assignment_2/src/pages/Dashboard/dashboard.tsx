import { useState, useEffect } from 'react'
import { Button, Group, Stack, Tabs } from '@mantine/core'
import { User } from 'firebase/auth'
import { firebaseSignOut, firebaseGetAllUsers } from '../../firebase/FirebaseService'
import { useAuth } from '../../contexts/useAuth'
import CatWidget from '../../widgets/CatWidget'
import BookWidget from '../../widgets/BookWidget'
import LovecraftWidget from '../../widgets/LovecraftWidget'

const handleSignOut = () => {
    SignOut()
}
const SignOut = async () => {
    try {
        await firebaseSignOut()
    }
    catch (error) {}
}


const Dashboard = () => {
    const [allUsers, setAllUsers] = useState<string[]>([])
    const auth = useAuth()
    const [currentUser, setCurrentUser] = useState<User | null>(auth.user)
    
    useEffect(() => {
        try {
            setCurrentUser(auth.user)
            console.log("attempting to load all users from firebase")
            firebaseGetAllUsers()
            .then((data)=> {
                setAllUsers(data)
            })
        }catch(error){
            console.error(error)
        }
    },  [])

    return (
        <div className='flex h-screen w-full'>
            <div className='w-full max-w-md'>
                <Tabs color='red' defaultValue='userProfile'>
                    <Tabs.List>
                        <Tabs.Tab value='widgets'>Widgets</Tabs.Tab>
                        <Tabs.Tab value='userProfile'>User Profile</Tabs.Tab>
                        <Tabs.Tab value='allUsers'>All Users</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value='widgets'>
                        <Stack>
                            <CatWidget/>
                            <BookWidget/>
                            <LovecraftWidget/>
                        </Stack>
                    </Tabs.Panel>
                    <Tabs.Panel value='userProfile'>
                        <div className='mx-6 my-4'>
                        <p className='text-sm/6' style={{ textAlign: 'left' }}>Name: {currentUser?.displayName}</p>
                        <p className='text-sm/6' style={{ textAlign: 'left' }}>Email: {currentUser?.email}</p>
                        <p className='text-sm/6' style={{ textAlign: 'left' }}>Created At: {currentUser?.metadata.creationTime}</p>
                        <p className='text-sm/6' style={{ textAlign: 'left' }}>Last Signed In: {currentUser?.metadata.lastSignInTime}</p>
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value='allUsers'>
                        <div className='mx-6 my-4'>
                        <ul className='gap-2'>
                        {allUsers.map((user: string, index: number) => (
                            <li key={index}
                            className='relative rounded-md p-3 text-sm/6'>
                            {user}
                            </li>
                        ))}
                        </ul>
                        </div>
                    </Tabs.Panel>
                </Tabs>
                <Group justify='center'>
                <Button color='red' className='my-4' onClick={handleSignOut}>Sign Out</Button></Group>
            </div>
        </div>
    );
};

export default Dashboard;