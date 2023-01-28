import { Badge, Box, Button, ButtonGroup, Center, Container, Heading, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useNoteContext } from '../../context/NoteContext';
import { CompleteNote, RawNote, Tag } from '../../types/Types';
import ReactMarkdown from 'react-markdown'


const ViewNote:React.FC = () => {

  const {notesWithTags, setNotes, getNoteByID} = useNoteContext();

  const {noteID} = useParams();

  const note = getNoteByID(noteID!);

  const navigate = useNavigate();

  if (!note) return <Navigate to= "/" replace/>

  const deleteNote= (id: string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id);
    })
  }

  return (
    <Container maxW='90vw' maxH='100vh'>
    <Box mt={8} width='100%' height='100vh'>
    <Box mb={8}>
      <Stack direction='row' justify='space-between' align='center'>
          <Heading mb={3}>{note.title}</Heading>
        <ButtonGroup gap='2' mt='1'>
        <Link to='edit'><Button color='gray.50'colorScheme="messenger">Edit</Button></Link>
        <Button onClick={()=> {deleteNote(note.id); navigate('/')}} colorScheme="red" variant='outline' >Delete Note</Button>
        <Link to='..'><Button colorScheme="gray" variant='outline' borderColor='blackAlpha.500'>Back</Button></Link>
        </ButtonGroup>
      </Stack>
      <Wrap>
              {note.tags.map((tag: Tag)=> (
                <WrapItem>
                  <Center>
                    <Badge variant= 'outline' color='#0078FF' borderColor='#0078FF' px='10px' py= '3px' >{tag.label}</Badge>
                  </Center>
                </WrapItem>
              ))}
      </Wrap>
    </Box>
    <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </Box>  
    </Container>
  )
}

export default ViewNote