import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react"
import React, { useEffect } from "react"

const ModalProductDetail = ({ Open, Close, isError, Data, Title, SetUnit, Cancel, Submit }) => {
    console.log(Data)
    return (
        <>
            <Modal
                isOpen={Open}
                onClose={Close}
                size='full'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{Title}</ModalHeader>
                    <ModalCloseButton onClose={Close} />
                    <ModalBody pb={6}>
                        <FormControl isInvalid={isError}>
                            <FormLabel>Description</FormLabel>
                            <Textarea placeholder='Unit name' defaultValue={Data.description} onChange={SetUnit} />

                            {isError ? (
                                <FormErrorMessage>Field is required.</FormErrorMessage>
                            ) : (
                                ""
                            )}
                        </FormControl>
                        <FormControl isInvalid={isError}>
                            <FormLabel>Indication</FormLabel>
                            <Textarea placeholder='Unit name' defaultValue={Data.indication} onChange={SetUnit} />

                            {isError ? (
                                <FormErrorMessage>Field is required.</FormErrorMessage>
                            ) : (
                                ""
                            )}
                        </FormControl>
                        <FormControl isInvalid={isError}>
                            <FormLabel>Dose</FormLabel>

                            <Textarea placeholder='Unit name' defaultValue={Data.dose} onChange={SetUnit} />
                            {isError ? (
                                <FormErrorMessage>Field is required.</FormErrorMessage>
                            ) : (
                                ""
                            )}
                        </FormControl>
                        <FormControl isInvalid={isError}>
                            <FormLabel>Rules</FormLabel>

                            <Textarea placeholder='Unit name' defaultValue={Data.rules} onChange={SetUnit} />
                            {isError ? (
                                <FormErrorMessage>Field is required.</FormErrorMessage>
                            ) : (
                                ""
                            )}
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={Submit}>
                            Save
                        </Button>
                        <Button onClick={Cancel}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalProductDetail