import NoteForm from '../../components/NoteForm';
import {Container, Box, Text} from '@chakra-ui/react';

const NewNote:React.FC = () => {
  return (
    <Container maxW='90vw' maxH='100vh'>
      <Box mt={8} width='100%' height='100vh'>
      <Text fontSize='4xl' fontWeight='bold'>New Note</Text>
      <NoteForm/>
      </Box>
    </Container>
  )
}

export default NewNote