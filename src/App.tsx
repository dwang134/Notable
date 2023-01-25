import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { RawNote, Tag } from '../types/Types';
import { Box, Container, Text} from '@chakra-ui/react';
import NoteList from '../components/NoteList';

const App = () => {

  return (
    <Container maxW='90vw' maxH='100vh'>
    <Box mt={5} width='100%' height='100vh'>
    <NoteList/>
    </Box>
    </Container>
  )
}

export default App
