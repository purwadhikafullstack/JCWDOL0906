import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, useDisclosure } from "@chakra-ui/react"
import React, { useEffect } from "react"

const ModalProductStock = ({ Open, Close, isError, Data, Title, Submit, defaultUnitQty, setDefaultUnitQty }) => {
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
                                    <FormLabel>Qty</FormLabel>
                                    <Input placeholder='Unit name' defaultValue={defaultUnitQty} onChange={setDefaultUnitQty} />

                                    {isError ? (
                                        <FormErrorMessage>Field is required.</FormErrorMessage>
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