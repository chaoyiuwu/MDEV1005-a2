import { Stack, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import { Link } from "react-router"

const phrases = [
    "booo stop typing random stuff in the address box",
    "I don't know what you were trying to access but I ain't implementing that",
    "not paid enough to implement this (not paid at all, even)",
    "the assignment deadline is too soon for whatever this is to be implemented",
    "yep it's a 404",
    "what did you expect",
    "Read Discourse on Colonialism. That is all",
    "Anyway Free Palestine, Sudan, the Congo, Syria, the Kurds, and Land Back",
]
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

const NotFound = () => {
    const [phrase, setPhrase] = useState('')

    useEffect(() => {
        setPhrase(phrases[getRandomInt(phrases.length-1)])
    }, [])

    return(
        <div className='flex h-screen'>
            <div className='m-auto'>
        <Stack gap='md'>
            <Text size='lg' ta='center'>{phrase}</Text>
            <Link to='/dashboard'><Text size='sm' ta='center'>Return to Dashboard (don't think you can do it if you weren't logged in)</Text></Link>
            <Link to='/'><Text size='sm' ta='center'>Return to Landing</Text></Link>
        </Stack>
        </div>
        </div>
    )
}

export default NotFound