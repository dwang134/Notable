import { Box, Container, Heading } from '@chakra-ui/react';
import React from 'react'
import { Navigate, useParams } from 'react-router-dom';
import NoteForm from '../../../components/NoteForm';
import { useNoteContext } from '../../../context/NoteContext';
import { CompleteNote, NoteData } from '../../../types/Types';



const EditNote:React.FC = () => {

  const {notesWithTags, setNotes, getNoteByID} = useNoteContext();

  const {noteID} = useParams();

  const note = getNoteByID(noteID!);

  if (!note) return <Navigate to= "/" replace/>

  const onEditNote = (id: string, {tags, ...data}: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note=> {
        if (note.id === id) {
          return {
            ...note, ...data, tagIds: tags.map(tag => tag.id)
          }
        }else{
          return note;
        }
      })
  })
  }

  return (
    <Container maxW='90vw' maxH='100vh'>
    <Box mt={8} width='100%' height='100vh'>
    <Heading fontSize='4xl' fontWeight='bold'>Edit Note</Heading>
    <NoteForm editingNote={note} noteTitle={note.title} noteTags={note.tags} noteMarkdown={note.markdown} noteID={note.id} editNoteSubmit={onEditNote}/>
    </Box>
    </Container>
  )
}

export default EditNote

function uuidv4(): string {
  throw new Error('Function not implemented.');
}
