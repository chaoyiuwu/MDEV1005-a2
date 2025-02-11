import { useState, useEffect } from 'react'
import { Button, Grid, GridCol, Group, Stack, Tabs, Text, List } from '@mantine/core'
import { User } from 'firebase/auth'
import { firebaseSignOut, firebaseGetAllUsers } from '../../firebase/FirebaseService'
import { useAuth } from '../../contexts/useAuth'
import CatWidget from '../../widgets/CatWidget'
import BookWidget from '../../widgets/BookWidget'
import LovecraftWidget from '../../widgets/LovecraftWidget'

// a non-async function that calls the async SignOut function so that the SignOut button onClick works
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
    const auth = useAuth()
    const [allUsers, setAllUsers] = useState<string[]>([])
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
        <div className='flex h-screen flex-col w-full'>
                <Tabs color='red' defaultValue='userProfile'>
                    <Tabs.List justify='center'>
                        <Tabs.Tab value='widgets'>Widgets</Tabs.Tab>
                        <Tabs.Tab value='userProfile'>User Profile</Tabs.Tab>
                        <Tabs.Tab value='allUsers'>All Users</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value='widgets'>
                        <Stack gap='md'>
                            <CatWidget/>
                            <BookWidget/>
                            <LovecraftWidget/>
                        </Stack>
                    </Tabs.Panel>
                    <Tabs.Panel value='userProfile'>
                        <div className='flex justify-center px-2 pt-2'>
                            <Grid overflow='hidden'>
                            <GridCol span={6}><Text ta='right'>Name:</Text></GridCol>
                            <GridCol span={6}><Text>{currentUser?.displayName}</Text></GridCol>
                            <GridCol span={6}><Text ta='right'>Email:</Text></GridCol>
                            <GridCol span={6}><Text>{currentUser?.email}</Text></GridCol>
                            <GridCol span={6}><Text ta='right'>Created At:</Text></GridCol>
                            <GridCol span={6}><Text>{currentUser?.metadata.creationTime}</Text></GridCol>
                            <GridCol span={6}><Text ta='right'>Last Signed In:</Text></GridCol>
                            <GridCol span={6}><Text>{currentUser?.metadata.lastSignInTime}</Text></GridCol>
                            </Grid>
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value='allUsers'>
                        <div className='flex justify-center pt-2'>
                            <List withPadding spacing='sm'>
                            {allUsers.map((user: string, index: number) => (
                                <List.Item key={index}>{user}</List.Item>
                            ))}
                            </List>
                        </div>
                    </Tabs.Panel>
                </Tabs>
                <Group justify='center'><Button className='mt-16 mb-4' color='red' onClick={handleSignOut}>Sign Out</Button></Group>
            
        </div>
    );
};

export default Dashboard;