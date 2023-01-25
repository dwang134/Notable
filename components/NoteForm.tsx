import { Container, FormControl, FormHelperText, FormLabel, Input, Stack, VStack, Flex, Box, Textarea, Button, ButtonGroup} from '@chakra-ui/react'
import CreatableReactSelect from 'react-select/creatable';
import {useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FormEvent, useRef, useState } from 'react';
import {NoteData, Tag} from '../types/Types';
import { useNoteContext } from '../context/NoteContext';

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
}

const NoteForm: React.FC = () => {

  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef= useRef<HTMLTextAreaElement>(null);
  const toast = useToast();
  const [selectedTags, setSelectedTags] = useState<Tag []>([]);
  const {onCreateNote} = useNoteContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!titleRef.current || !markdownRef.current){
        toast({
          title: 'Please enter title and content',
          status: 'error',
          isClosable: true,
        })
    }else{
      onCreateNote({
        title: titleRef.current.value,
        tags: [],
        content: markdownRef.current.value
      })
    }
  }

  return (
    <Box maxW="100%" height="90%" mt={2}>
      <FormControl onSubmit={handleSubmit}>
        <Stack direction="column" height="100%">
          <Stack direction={["column", "row"]} spacing="24px">
            <Flex direction="column" w="55%">
              <FormLabel>Title</FormLabel>
              <Input size="md" height="38px" borderColor='blackAlpha.400' isRequired ref={titleRef}/>
            </Flex>
            <Flex direction="column" w="45%">
              <FormLabel>Tags</FormLabel>
              <Box w="100%">
                <CreatableReactSelect 
                value={selectedTags.map((tag: Tag) => {
                  return { name: tag.name, value: tag.id }
                })}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => {
                      return { name: tag.name, id: tag.value }
                    })
                  )
                }}
                isMulti />
              </Box>
            </Flex>
          </Stack>
          <FormLabel>Body</FormLabel>
          <Textarea borderColor='blackAlpha.400' height="28rem" ref={markdownRef} placeholder="Enter the content for the notes here!" />
          <Flex justifyContent="flex-end">
            <ButtonGroup gap="2" mt={1}>
              <Button colorScheme="messenger">Save</Button>
              <Link to="..">  
                <Button colorScheme="gray">Cancel</Button>
              </Link>
            </ButtonGroup>
          </Flex>
        </Stack>
      </FormControl>
    </Box>
  );
};

export default NoteForm;
