import { Box, Button, Card, Flex, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Text, Th, Thead, Tr, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { clearForm, swalFailed, swalSuccess } from '../../../../../helper';
import TableCRUD from '../../../components/table';
import ModalEditForm from '../../../components/modal';


const ListDefaultUnits = () => {
    const [units, setUnits] = useState([])
    const [dataEdit, setDataEdit] = useState({})
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [isError, setError] = useState(false)
    const modalEdit = useDisclosure()
    const [unitName, setUnitName] = useState("")
    const getData = async () => {
        try {
            let result = await axios.get("http://localhost:8000/api/unit/default")
            setUnits(result.data.data)
            console.log(result)
        } catch (error) {
            swalFailed(error.response.data.message)
        }
    }

    const { colorMode } = useColorMode();

    console.log("unitName ===========>     ", unitName)
    const handleSubmit = async () => {
        try {
            if (document.getElementById('unit').value === '') { setError(true); return; }
            let result = await axios.post("http://localhost:8000/api/unit/default", {
                unit: document.getElementById("unit").value
            })
            swalSuccess(result.data.message)
            clearForm(['unit'])
            getData()
            onClose()
        } catch (error) {
            swalFailed(error.response.data.message)
        }
    }

    const getDataEdit = async (e) => {
        try {
            let result = await axios.get('http://localhost:8000/api/unit/default/' + e.target.id)
            console.log(result)
            setDataEdit(result.data.dataValues)
        } catch (error) {
            swalFailed(error.response.data.message)
        }
    }

    const handleUpdate = async () => {
        try {
            if (unitName === '') { setError(true); return; }
            let result = await axios.post("http://localhost:8000/api/unit/default/" + dataEdit.id, {
                unit: unitName
            })
            swalSuccess(result.data.message)
            clearForm(['unit'])
            getData()
            modalEdit.onClose()
        } catch (error) {
            swalFailed(error.response.data.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        console.log("unitName ===========>     ", unitName)
    }, [unitName])

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
                        <TableCRUD data={units} header={['Unit Name']} dataFill={['unit_name']} action={(e) => { modalEdit.onOpen(); getDataEdit(e) }} />
                    </Box>
                </Flex>
            </Card>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Default Unit</ModalHeader>
                    <ModalCloseButton onClose={onClose} />
                    <ModalBody pb={6}>
                        <FormControl isInvalid={isError}>
                            <FormLabel>Unit name</FormLabel>
                            <Input placeholder='Unit name' id="unit" />
                            {isError ? (
                                <FormErrorMessage>Field is required.</FormErrorMessage>
                            ) : (
                                ""
                            )}
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleSubmit()}>
                            Save
                        </Button>
                        <Button onClick={() => { onClose(); setError(false); }}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ModalEditForm
                Title="Edit Default Unit"
                Open={modalEdit.isOpen}
                Close={modalEdit.onClose}
                isError={isError}
                Data={dataEdit}
                SetUnit={(e) => setUnitName(e.target.value)}
                Cancel={() => { modalEdit.onClose(); setError(false); }}
                Submit={() => handleUpdate()} />
        </>

    )
}

export default ListDefaultUnits