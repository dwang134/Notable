import { Box, Button, ButtonGroup, Card, CardBody, CardHeader, Heading, Input, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import React, {ReactEventHandler, useMemo, useState} from 'react'
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { useNoteContext } from '../context/NoteContext';
import { Tag, Note, RawNote, TagNote } from '../types/Types';
import styled from 'styled-components';


const NoteList:React.FC = () => {

    const [title, setTitle] = useState<string>('');
    const [searchTags, setSearchTags] = useState<Tag []>([]);
    const {notesWithTags, setNotes, tags, setTags} = useNoteContext();

    const filteredNotes = useMemo(() => {
      return notesWithTags.filter((note: TagNote) => {
        return (
          (title === "" ||
            note.title.toLowerCase().includes(title.toLowerCase())) &&
          (searchTags.length === 0 ||
            searchTags.every(tag =>
              note.tags.some(noteTag => noteTag.id === tag.id)
            ))
        )
      })
    }, [title, tags, notesWithTags])

    const StyledButton= styled(Button)`
      &:hover {
        cursor: default;
      }
    `;
    
    const StyledCard = styled(Card)`
    &:hover,
    &:focus{
      translate
    }
    `

    console.log('Filtered notes tag: ', notesWithTags);
    console.log('result: ', filteredNotes);

    return (
        <Box mt={8} width='100%' height='100vh'>
        <Stack direction= 'row' justify='space-between' align='center'>
        <Text fontSize='4xl' fontWeight='bold'>Notes</Text>
        <ButtonGroup gap="2" mt={1}>
                <Link to= '/new'><Button color='gray.50'colorScheme="messenger">Create</Button></Link>
                <Link to="..">
                  <Button colorScheme="gray" variant='outline' bg='gray.50'>Edit Tags</Button>
                </Link> 
        </ButtonGroup>
        </Stack>
        <SimpleGrid columns={2} spacing={10} mt={6}>
        <Stack direction='column'>
            <Text mb={1}>Title</Text>
            <Input value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setTitle(e.target.value)} placeholder='Search for title' size="md" height="38px" borderColor='blackAlpha.400'/>
        </Stack>
        <Stack>
        <Text mb={1}>Tags</Text>
                <Box w="100%">
                  <ReactSelect
                  options={tags.map(tag => {
                    return {label: tag.label, value: tag.id}
                  })}
                  value={searchTags.map((tag: Tag) => {
                    return { label: tag.label, value: tag.id }
                  })}
                  onChange={tags => {
                    setSearchTags(
                      tags.map(tag => {
                        return { label: tag.label, id: tag.value }
                      })
                    )
                  }}
                  isMulti />
                </Box>   
        </Stack>
        {filteredNotes.map((note: Note) => (
            <Card key={note.id} >
            <CardHeader>
              <Heading size= 'md'>{note.title}</Heading>
            </CardHeader>
            <CardBody>{note.tags.map(tag=>
              <StyledButton color='gray.50' colorScheme='messenger'>{tag.label}</StyledButton>
            )}
            </CardBody>
            </Card>
        ))}
        </SimpleGrid>
        </Box>
    )
}

export default NoteList;