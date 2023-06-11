import { Box, Button, Card, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { swalFailed } from '../../../utils';


const ListDefaultUnits = () => {
    const [units, setUnits] = useState([])
    const { onOpen, onClose, isOpen } = useDisclosure()
    const getData = async () => {
        try {
            let result = await axios.get("http://localhost:8000/api/unit/default")
            setUnits(result.data.data)
            console.log(result)
        } catch (error) {
            swalFailed(error.response.data.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const textColor = useColorModeValue("gray.700", "white");
    const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const textTableColor = useColorModeValue("gray.500", "white");
    return (
        <>

            <Card p='0px' maxW={{ sm: "320px", md: "100%" }}>
                <Flex direction='column'>
                    <Flex align='center' justify='space-between' p='22px'>
                        <Text fontSize='lg' color={textColor} fontWeight='bold'>
                            Default Units
                        </Text>
                        <Button variant='primary' maxH='30px' onClick={onOpen}>
                            Add New
                        </Button>
                    </Flex>
                    <Box overflow={{ sm: "scroll", lg: "hidden" }}>
                        <Table>
                            <Thead>
                                <Tr bg={tableRowColor}>
                                    <Th color='gray.400' borderColor={borderColor}>
                                        No
                                    </Th>
                                    <Th color='gray.400' borderColor={borderColor}>
                                        Unit Name
                                    </Th>
                                    <Th color='gray.400' borderColor={borderColor}>
                                        Action
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {units.length > 0 ? units.map((el, index, arr) => {
                                    return (
                                        <Tr key={index}>
                                            <Td
                                                color={textTableColor}
                                                fontSize='sm'
                                                fontWeight='bold'
                                                borderColor={borderColor}
                                                border={index === arr.length - 1 ? "none" : null}>
                                                {index + 1}
                                            </Td>
                                            <Td
                                                color={textTableColor}
                                                fontSize='sm'
                                                border={index === arr.length - 1 ? "none" : null}
                                                borderColor={borderColor}>
                                                {el.unit_name}
                                            </Td>
                                            <Td
                                                color={textTableColor}
                                                fontSize='sm'
                                                border={index === arr.length - 1 ? "none" : null}
                                                borderColor={borderColor}>
                                                <Button>
                                                    Edit
                                                </Button>
                                            </Td>
                                        </Tr>
                                    );
                                }) : <Tr>
                                    <Td
                                        color={textTableColor}
                                        fontSize='sm'
                                        fontWeight='bold'
                                        borderColor={borderColor}
                                        colSpan='3'>
                                        Data Not Found
                                    </Td>
                                </Tr>}
                            </Tbody>
                        </Table>
                    </Box>
                </Flex>
            </Card>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Conversion Unit</ModalHeader>
                    <ModalCloseButton onClose={onClose} />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Unit name</FormLabel>
                            <Input placeholder='Unit name' id="unit" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}

export default ListDefaultUnits