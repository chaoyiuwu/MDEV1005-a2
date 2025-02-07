import { useState, useEffect } from "react"
import { Blockquote, Button } from "@mantine/core"

interface Book {
  id: string
  name: string
  year: string
}

interface SentenceData {
  id: string
  sentence: string
  book: Book
}

interface ApiResponse {
  data: SentenceData[]
}
const LovecraftWidget = () => {
    const [response, setResponse] = useState<ApiResponse>()
    const fetchQuote = async () => {
        fetch('https://randomlovecraft.com/api/sentences')
            .then(response => response.json())
            .then(data => {
                setResponse(data)
        })
    }
    const refreshQuote = () => {
        fetchQuote()
    }
    useEffect(() => {
        try {
            fetchQuote()
        }
        catch(error: any){
            console.error(error.message)
        }
    }, [])

    return (
        <div className='flex flex-col items-center'>
            <p className="text-base/7 font-semibold my-2">API 3: A Random Lovecraft Quote</p>
            <div className='w-full md:w-md'>
                <Blockquote color="gray" cite={`- ${response?.data[0].book.name} (${response?.data[0].book.year})`} mt="xl">
                    {response?.data[0].sentence}
                </Blockquote>
            </div>
            <Button className='my-2' color='green' variant='subtle' onClick={refreshQuote}>Get Another Quote!</Button>
        </div>
    )
}

export default LovecraftWidget