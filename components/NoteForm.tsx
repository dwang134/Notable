import { Container, FormControl, FormHelperText, FormLabel, Input, Stack, VStack, Flex, Box, Textarea, Button, ButtonGroup} from '@chakra-ui/react'
import CreatableReactSelect from 'react-select/creatable';
import {useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useRef, useState } from 'react';
import {NoteData, Tag} from '../types/Types';
import { useNoteContext } from '../context/NoteContext';
import {v4 as uuidv4} from 'uuid';

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
}

const NoteForm: React.FC = () => {

  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef= useRef<HTMLTextAreaElement>(null);
  const toast = useToast();
  const [selectedTags, setSelectedTags] = useState<Tag []>([]);
  const {onCreateNote, tags, setTags, addTag} = useNoteContext();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('The form has been submitted');
    console.log(titleRef.current);
    console.log(markdownRef.current);
    if (!titleRef.current || !markdownRef.current){

        toast({
          title: 'Please enter all fields',
          position: 'top',
          isClosable: true,
          status: 'error'
        })
      
    }else{
      onCreateNote({
        //already made it mandatory for user on input component
        title: titleRef.current!.value,
        tags: selectedTags,
        content: markdownRef.current!.value
      })
    }
    
    navigate('..');
  }

  return (
    <Box maxW="100%" height="90%" mt={4}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Stack direction="column" height="100%">
            <Stack direction={["column", "row"]} spacing="24px">
              <Flex direction="column" w="55%">
                <FormLabel>Title</FormLabel>
                <Input placeholder= 'Enter the title' size="md" height="38px" borderColor='blackAlpha.400' isRequired ref={titleRef}/>
              </Flex>
              <Flex direction="column" w="45%">
                <FormLabel>Tags</FormLabel>
                <Box w="100%">
                  <CreatableReactSelect
                  onCreateOption= {label => {
                    const newTag = {id: uuidv4(), label}
                    addTag(newTag)
                    setSelectedTags(prev => [...prev, newTag])
                  }}
                  options={tags.map(tag => {
                    return {label: tag.label, value: tag.id}
                  })}
                  value={selectedTags.map((tag: Tag) => {
                    return { label: tag.label, value: tag.id }
                  })}
                  onChange={tags => {
                    setSelectedTags(
                      tags.map(tag => {
                        return { label: tag.label, id: tag.value }
                      })
                    )
                  }}
                  isMulti />
                </Box>
              </Flex>
            </Stack>
            <FormLabel>Body</FormLabel>
            <Textarea isRequired borderColor='blackAlpha.400' height="28rem" ref={markdownRef} placeholder="Enter the content for the notes here!" />
            <Flex justifyContent="flex-end">
              <ButtonGroup gap="2" mt={1}>
                <Button colorScheme="messenger" type='submit'>Save</Button>
                <Link to="..">
                  <Button colorScheme="gray">Cancel</Button>
                </Link>
              </ButtonGroup>
            </Flex>
          </Stack>
        </FormControl>
      </form>
    </Box>
  );
};

export default NoteForm;
