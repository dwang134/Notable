import { Box, Button, ButtonGroup, Input, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import {useState} from 'react'
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { useNoteContext } from '../context/NoteContext';
import { Tag } from '../types/Types';

const NoteList:React.FC = () => {

    const [searchTags, setSearchTags] = useState<Tag []>([]);
    const {tags, setTags} = useNoteContext();

    return (
        <Box mt={8} width='100%' height='100vh'>
        <Stack direction= 'row' justify='space-between'>
        <Text fontSize='4xl' fontWeight='bold'>Notes</Text>
        <ButtonGroup gap="2" mt={1}>
                <Link to= '/new'><Button colorScheme="messenger">Create</Button></Link>
                <Link to="..">
                  <Button colorScheme="gray" variant='outline' bg='gray.50'>Edit Tags</Button>
                </Link> 
        </ButtonGroup>
        </Stack>
        <SimpleGrid columns={2} spacing={10} mt={6}>
        <Stack direction='column'>
            <Text mb={1}>Title</Text>
            <Input placeholder= 'Search for title' size="md" height="38px" borderColor='blackAlpha.400'/>
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
        <Box bg='tomato' height='80px'></Box>
        <Box bg='tomato' height='80px'></Box>
        <Box bg='tomato' height='80px'></Box>
        <Box bg='tomato' height='80px'></Box>
        <Box bg='tomato' height='80px'></Box>
        </SimpleGrid>
        </Box>
    )
}

export default NoteList;