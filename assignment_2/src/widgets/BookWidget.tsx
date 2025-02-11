import { useState } from "react"
import { Text, TextInput, Card, Image, Button, Grid, Collapse } from "@mantine/core"
import { useDisclosure } from '@mantine/hooks'

interface BookData {
    author_name: string[],
    title: string,
    key: string,
    cover_i: string,
    first_publish_year: string,
}

// OpenLibrary's data is not the cleanest and sometimes an author is listed twice
const readAuthorNames = (names: string[]): string[] => {
    let readNames: string[] = []
    names.forEach((name)=> {
        if (readNames.indexOf(name.trim()) == -1) {
            readNames.push(name.trim())
        }
    })
    return readNames
}

function BookWidget() {
    const [opened, { toggle }] = useDisclosure(true)
    const [query, setQuery] = useState('')
    const [books, setBooks] = useState<BookData[]>([])

    const fetchBooks = async () => {
        if (query == '') return
        let readData: BookData[] = []
        try{
            fetch('https://openlibrary.org/search.json?q=' + query.replace(' ', '+') + "&limit=10")
                .then(response => response.json())
                .then(data => {
                    data.docs.forEach((doc: any) => {
                        readData.push({
                            author_name: readAuthorNames(doc.author_name),
                            title: doc.title,
                            cover_i: doc.cover_i ?? '',
                            key: doc.key,
                            first_publish_year: doc.first_publish_year
                        }
                    )
                })
                setBooks(readData)
            })
        }
        catch(error: any) {
            console.error(error.message)
        }
    }
    
    return(
        <div className='flex flex-col items-center'>
            <p className='text-base/7 font-semibold my-2'>API 2: Look Up A Book!</p>
            <TextInput
                label='Enter the name of a book, a series or an author'
                value={query}
                onChange={(e) => setQuery(e.target.value)}/>
            <Button className='my-2' color='green' variant='subtle' onClick={() => fetchBooks()}>Search</Button>
            {books.length > 0 && 
            (<Button className='my-2' color='green' variant='subtle' onClick={toggle}>
                Toggle Search Result
            </Button>)}
            <Collapse in={opened}>
                <Grid>
                    {books.map((book: BookData, index) => (
                        <Grid.Col key={index} span={{base:6, sm:3}}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Card.Section>
                                    <Image
                                        src={book.cover_i != '' ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null}
                                            fallbackSrc='https://placehold.co/600x400?text=Placeholder'
                                        />
                                </Card.Section>
                                <Text fw={500}>{book.title}</Text>                           
                                <Text size="sm" c="dimmed">author(s): {book.author_name.join(' | ')}</Text>
                                <Text size="sm" c="dimmed">First Published: {book.first_publish_year}</Text>
                                <a href={'https://openlibrary.org'+book.key} target="_blank">
                                    <Button color="blue" fullWidth mt="md" size="xs" variant='subtle'>Open Library Entry</Button>
                                </a>
                            </Card>  
                        </Grid.Col>
                    ))}
                </Grid> 
            </Collapse>
        </div>
    )
}

export default BookWidget