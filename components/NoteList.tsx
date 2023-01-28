import {Box, Button, ButtonGroup, Card, CardBody, CardHeader, Heading, Input, SimpleGrid, Stack, Text, Badge, Wrap, WrapItem, Center, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from '@chakra-ui/react';
import {CloseIcon} from '@chakra-ui/icons';
import React, {ReactEventHandler, useMemo, useState} from 'react'
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { useNoteContext } from '../context/NoteContext';
import { Tag, Note, RawNote, CompleteNote } from '../types/Types';
import styled from 'styled-components';


const NoteList:React.FC = () => {

    const [title, setTitle] = useState<string>('');
    const [searchTags, setSearchTags] = useState<Tag []>([]);
    const {notesWithTags, setNotes, tags, setTags} = useNoteContext();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const filteredNotes = useMemo(() => {
      return notesWithTags.filter((note: CompleteNote) => {
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
    
      transition: translate ease-in-out 100ms, box-shadow ease-in-out 100ms;

      &:hover,
      &:focus{
        translate: 0 -5px;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2);
      }
    `

    const deleteTagByID = (tagID: string) => {
      setTags(prevTags=> {
        return prevTags.filter((tag)=> tag.id!== tagID);
      })
    }

    console.log('Filtered notes tag: ', notesWithTags);
    console.log('result: ', filteredNotes);

    return (
        <Box mt={8} width='100%' height='100vh'>
        <Stack direction= 'row' justify='space-between' align='center'>
        <Heading fontSize='4xl' fontWeight='bold'>Notes</Heading>
        <ButtonGroup gap="2" mt={1}>
                <Link to= '/new'><Button color='gray.50'colorScheme="messenger">Create</Button></Link>
                <Link to="..">
                  <Button onClick={onOpen} colorScheme="gray" variant='outline' bg='gray.50'>Edit Tags</Button>
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
                <Box w='' >
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
            <Link to={`/${note.id}`}>
              <StyledCard key={note.id} align='center'>
              <CardHeader>
                <Heading size= 'md'>{note.title}</Heading>
              </CardHeader>
              <CardBody>
              <Stack direction={['column', 'row']} spacing='10px' >
              <Wrap>
                {note.tags.map(tag=>
                  <WrapItem>
                    <Center>
                      <Badge color='gray.50' bg='#0078FF' px='10px' py= '5px' borderRadius= 'md'>{tag.label}</Badge>
                    </Center>
                  </WrapItem>
                )}
              </Wrap>
              </Stack>
              </CardBody>
              </StyledCard>
            </Link>
        ))}
        </SimpleGrid>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Tags</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
            {tags.map((tag: Tag)=> (
              <Stack direction='row' align='center'>
                <Input defaultValue={tag.label}/>
                <CloseIcon onClick={()=> deleteTagByID(tag.id)}_hover={{cursor: 'pointer'}} />
              </Stack>
            ))}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
        </Box>
    )
}

export default NoteList;