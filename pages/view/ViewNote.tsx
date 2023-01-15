import { Text } from '@chakra-ui/react';
import React from 'react'
import { useParams } from 'react-router-dom';

const ViewNote = () => {

  const {noteID} = useParams();

  return (
    <Text size='xl' fontWeight='bold'>Currently viewing note {noteID}</Text>
  )
}

export default ViewNote