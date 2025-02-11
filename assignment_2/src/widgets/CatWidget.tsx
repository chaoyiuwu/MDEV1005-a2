import { useEffect, useState } from 'react'
import { Image, Button } from '@mantine/core'

const headers = {
    "Content-Type": "application/json",
    "x-api-key": "live_XDMtmtlrQanVnOXaPD5NSBDjRfAsqm9rYPPxxb5yFMTSKlYLbO30JEVJ9QXmkro7"
}
const requestHeaders = new Headers(headers)

const CatWidget = () => {
    const [imageURL, setImageURL]= useState<string|null>(null)
    const fetchCatImage = async () => {
        fetch('https://api.thecatapi.com/v1/images/search', {
            method: 'GET',
            headers: requestHeaders
        })
            .then(response => response.json())
            .then(data => {
                setImageURL(data[0].url)
        })
    }
    const refreshImage = () => {
        fetchCatImage()
    }
    useEffect(() => {
        try {
            fetchCatImage()
        }
        catch(error: any){
            console.error(error.message)
        }
    }, [])

    return(
        <div className='flex flex-col items-center'>
            <p className="text-base/7 font-semibold my-2">API 1: A Random Cat Photo</p>
            <div className='w-full md:w-md'>
                <Image radius='md' src={imageURL} alt='a random cat photo fetched from thecatapi'
                fallbackSrc='https://placehold.co/600x400?text=Placeholder'/>
            </div>
            <Button className='my-2' color='green' variant='subtle' onClick={refreshImage}>Get Another Cat Photo!</Button>
        </div>
    )
}

export default CatWidget