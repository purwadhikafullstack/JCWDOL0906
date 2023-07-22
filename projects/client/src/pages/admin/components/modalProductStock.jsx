import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, useDisclosure } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

const ModalProductStock = ({ Open, Close, Data, Title, Submit, defaultUnitQty, setDefaultUnitQty }) => {
    const [value, setValue] = useState(0)
    const [isError, setError] = useState(false)
    useEffect(() => {
        if (isNaN(value) || value === '') {
            setError(true)
        } else {
            setError(false)
        }
    }, [value])
    return (
        <>
            <Modal
                isOpen={Open}
                onClose={Close}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{Title}</ModalHeader>
                    <ModalCloseButton onClose={Close} />
                    <ModalBody pb={6}>
                        <HStack spacing='24px'>
                            <Box borderWidth='1px' borderRadius='lg' p='6'>

                                <FormControl isInvalid={isError}>
                                    <FormLabel>Quantity</FormLabel>

                                    <Input placeholder='Quantity' defaultValue={defaultUnitQty} onChange={(e) => { setDefaultUnitQty(e.target.value); setValue(e.target.value) }} />

                                    {isError ? (
                                        <FormErrorMessage>Field is should in number</FormErrorMessage>
                                    ) : (
                                        ""
                                    )}
                                </FormControl>
                            </Box>
                        </HStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={Submit}>
                            Update
                        </Button>
                        <Button onClick={Close}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalProductStock