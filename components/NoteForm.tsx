import { Container, FormControl, FormHelperText, FormLabel, Input, Stack, VStack, Flex, Box, Textarea, Button, ButtonGroup} from '@chakra-ui/react'
import CreatableReactSelect from 'react-select/creatable';
import {useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FormEvent, useRef, useState } from 'react';
import {NoteData, Tag} from '../types/Types';


type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
}

const NoteForm: React.FC = ({onSubmit}: NoteFormProps) => {

  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef= useRef<HTMLTextAreaElement>(null);
  const toast = useToast();
  const [selectedTags, setSelectedTags] = useState<Tag []>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!titleRef.current || !markdownRef.current){
        toast({
          title: 'Please enter title and content',
          status: 'error',
          isClosable: true,
        })
    }else{
      onSubmit({
        title: titleRef.current.value,
        tag: [],
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
              <Input size="md" height="38px" isRequired ref={titleRef}/>
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
          <Textarea height="28rem" ref={markdownRef} placeholder="Enter the content for the notes here!" />
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
