import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, useDisclosure } from "@chakra-ui/react"
import React, { useEffect } from "react"

const ModalProductUnit = ({ Open, Close, isError, Data, Title, DefaultUnit, ConversionUnit, SetUnit, Cancel, Submit, setDefaultUnit, SetConversionUnit, setConversionUnitQty, setDefaultUnitQty }) => {
    console.log(Data)
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
                                    <FormLabel>Default Unit : {Data.default_unit_qty}</FormLabel>
                                    <Select placeholder='Select Unit' value={Data.default_unit_id} onChange={setDefaultUnit}>
                                        {
                                            DefaultUnit.map(i => <option key={i.id} value={i.id}>{i.unit_name}</option>)
                                        }
                                    </Select>

                                    {isError ? (
                                        <FormErrorMessage>Field is required.</FormErrorMessage>
                                    ) : (
                                        ""
                                    )}
                                </FormControl>
                                <FormControl isInvalid={isError}>
                                    <FormLabel>Qty</FormLabel>
                                    <Input placeholder='Unit name' defaultValue={Data.default_unit_qty} onChange={setDefaultUnitQty} />

                                    {isError ? (
                                        <FormErrorMessage>Field is required.</FormErrorMessage>
                                    ) : (
                                        ""
                                    )}
                                </FormControl>
                            </Box>
                            <Box borderWidth='1px' borderRadius='lg' p='6'>
                                <Divider orientation='horizontal' />
                                <FormControl isInvalid={isError}>
                                    <FormLabel>Conversion Unit : {Data.conversion_unit_qty} </FormLabel>

                                    <Select placeholder='Select Unit' value={Data.conversion_unit_id} onChange={SetConversionUnit}>
                                        {
                                            ConversionUnit.map(i => <option key={i.id} value={i.id}>{i.unit_name}</option>)
                                        }
                                    </Select>
                                    {isError ? (
                                        <FormErrorMessage>Field is required.</FormErrorMessage>
                                    ) : (
                                        ""
                                    )}
                                </FormControl>
                                <FormControl isInvalid={isError}>
                                    <FormLabel>Qty</FormLabel>

                                    <Input placeholder='Unit name' defaultValue={Data.conversion_unit_qty} onChange={setConversionUnitQty} />
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

export default ModalProductUnit