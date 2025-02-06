import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react'
import { Button, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { firebaseSignOut, firebaseGetAllUsers } from '../../firebase/FirebaseService'

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
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let ignore = false
        try {
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
            console.error("error fetching a list of all users")
        }
    },  [allUsers])

    return (
        <div>
            <TabGroup vertical>
                <TabList className="flex flex-col">
                    <Tab className="data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline">Widgets</Tab>
                    <Tab className="data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline">User Profile</Tab>
                    <Tab className="data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline">All Users</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>Content 1</TabPanel>
                        <TabPanel>Content 2</TabPanel>
                        <TabPanel>
                            <ul>
                            {allUsers.map((user: string, index: number) => (
                            <li key={index}>
                                {user}
                            </li>
                                ))}
                            </ul>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            <Button onClick={handleSignOut}>Sign Out</Button>

        </div>
    );
};

export default Dashboard;