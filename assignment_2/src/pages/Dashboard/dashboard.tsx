import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react'
import { Button, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { User } from 'firebase/auth'
import { firebaseSignOut, firebaseGetAllUsers } from '../../firebase/FirebaseService'
import { useAuth } from '../../contexts/useAuth'

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
        let ignore = false
        try {
            setCurrentUser(auth.user)
            console.log("attempting to load all users from firebase")
            firebaseGetAllUsers()
            .then((data)=> {
                if (!ignore) {
                    setAllUsers(data)
                }
            })
            return () => {
                ignore = true
            }
        }catch(error){
            console.error(error)
        }
    },  [])

    return (
        <div className='flex h-screen w-full justify-center pt-24 px-4'>
            <div className='w-full max-w-md'>
            <TabGroup>
                <TabList className="flex flex-gap4">
                    <Tab className="data-[selected]:bg-blue-500 data-[hover]:underline">Widgets</Tab>
                    <Tab className="data-[selected]:bg-blue-500 data-[hover]:underline">User Profile</Tab>
                    <Tab className="data-[selected]:bg-blue-500 data-[hover]:underline">All Users</Tab>
                    </TabList>
                    <TabPanels className="mt-3">
                        <TabPanel className="rounded-xl bg-white/5 p-3">
                            Content 1
                            </TabPanel>
                        <TabPanel className="rounded-xl bg-white/5 p-3">
                            <p style={{ textAlign: 'left' }}>Name: {currentUser?.displayName}</p>
                            <p style={{ textAlign: 'left' }}>Email: {currentUser?.email}</p>
                            <p style={{ textAlign: 'left' }}>Created At: {currentUser?.metadata.creationTime}</p>
                            <p style={{ textAlign: 'left' }}>Last Signed In: {currentUser?.metadata.lastSignInTime}</p>
                        </TabPanel>
                        <TabPanel className="rounded-xl bg-white/5 p-3">
                            <ul className="gap-2 text-white/50">
                                {allUsers.map((user: string, index: number) => (
                                <li key={index}
                                    className='relative rounded-md p-3 text-sm/6 transition hover:bg-white/5'>
                                    {user}
                                </li>
                                ))}
                            </ul>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            <Button onClick={handleSignOut}>Sign Out</Button>
            </div>
        </div>
    );
};

export default Dashboard;