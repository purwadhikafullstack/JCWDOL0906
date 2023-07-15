import { AvatarBadge, Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Container, Divider, Flex, FormControl, FormLabel, Grid, Heading, HStack, Icon, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, StackDivider, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { BsChevronRight, BsTrash } from 'react-icons/bs'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { formatDate, rupiah, swalFailed, swalSuccess, time } from '../../../helper'
import { apiRequest } from '../../../helper/api'

const WaitingPayment = () => {
    const ref = useRef()
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [transaction, setTransaction] = useState([])
    const [code, setCode] = useState("")
    const [upload, setUpload] = useState(false)

    const getDataByStatus = async () => {
        try {
            const result = await apiRequest.get("/transaction/" + searchParams.get('status') + "/status")
            console.log(result.data.data)
            setTransaction(result.data.data)
        } catch (error) {

        }
    }

    const uploadBukti = async (e) => {
        console.log(e)
        try {
            let formData = new FormData()
            formData.append("image", e.files[0]);

            let result = await apiRequest.post("/transaction/" + e.id, formData);
            getDataByStatus();
            console.log(result.data.data)
            swalSuccess(result.data.message);
        } catch (error) {
            console.log(error);
            swalFailed(error.response.data.message);
        }
    };

    const getDetailTransaction = async (code) => {
        try {
            const result = await apiRequest.get("/transaction/" + code + "/code")
            console.log(result.data.data)

            setTransaction(result.data.data)
            onOpen()
        } catch (error) {

        }
    }

    const cancelTransaction = async (code) => {
        try {
            const result = await apiRequest.delete("/transaction/" + code)
            console.log(result.data.data)

            getDataByStatus()
        } catch (error) {

        }
    }

    useEffect(() => {
        getDataByStatus()
    }, [])
    return (
        <Container maxW='container.xl' p={5} mt={5}>
            <Card variant='outline'>
                <CardHeader>
                    <Heading size='md'>Menunggu Pembayaran</Heading>
                </CardHeader>

                <CardBody>
                    <Stack spacing='4'>
                        <Card variant='outline'>
                            <CardBody>
                                <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                                    {transaction.map(i =>
                                        <Card align='center' size={'2xl'}>
                                            <CardHeader w='100%'>
                                                <Flex >
                                                    <Heading size='md'> {i.transaction_code}</Heading>
                                                    <Spacer />
                                                    <Flex><Text color='gray'>Bayar sebelum &nbsp;</Text><Text as='b' color='blue.500'>{formatDate(i.createdAt)}, {time(i.createdAt)}</Text></Flex>
                                                </Flex>
                                            </CardHeader>
                                            <CardBody>
                                                {/* <HStack>
                                                    <Card>
                                                        <CardBody>
                                                            <Heading size='sm'>Metode Pembayaran : Bank Transfer</Heading>
                                                            <Flex spacing={2}>
                                                                <Center>
                                                                    <Image src='https://www.bca.co.id/-/media/Feature/Header/Header-Logo/logo-bca.svg?v=1' />
                                                                </Center>
                                                                <Spacer />
                                                                <Center>
                                                                    <Heading size='sm'> 72345678911</Heading>
                                                                </Center>
                                                            </Flex>

                                                        </CardBody>
                                                    </Card>
                                                    <Card>
                                                        <CardBody>
                                                            Total Pembayaran : {rupiah(i.total_price)}
                                                        </CardBody>
                                                    </Card>
                                                </HStack> */}
                                                <Stack direction='row' h='100px'>
                                                    <VStack>
                                                        <Heading size='sm'>Metode Pembayaran : Bank Transfer</Heading>
                                                        <Flex w='100%' justify='space-between'>
                                                            <Center>
                                                                <Image src='https://www.bca.co.id/-/media/Feature/Header/Header-Logo/logo-bca.svg?v=1' />
                                                            </Center>

                                                            <Center>
                                                                <Heading size='sm'> 72345678911</Heading>
                                                            </Center>
                                                        </Flex>
                                                    </VStack>

                                                    <Divider orientation='vertical' />
                                                    <Center>
                                                        <Text> Total Pembayaran : {rupiah(i.total_price)}</Text>
                                                    </Center>

                                                </Stack>
                                            </CardBody>
                                            <CardFooter>
                                                {code === i.transaction_code ? <>

                                                    <Button mr={2} colorScheme='blue' onClick={() => getDetailTransaction(i.transaction_code)}>Detail</Button>
                                                    <Flex>
                                                        <Input type='file' ref={ref} id={i.transaction_code} onChange={(e) => uploadBukti(e.target)} />
                                                        <Button ml={2} colorScheme='red' onClick={() => setCode("")}>X</Button>
                                                    </Flex>
                                                    <Button ml={2} colorScheme='red' onClick={() => cancelTransaction(i.transaction_code)}><Icon as={BsTrash} h={5} w={5} alignSelf={'center'} /></Button>

                                                </> : <>

                                                    <Button mr={2} colorScheme='blue' onClick={() => getDetailTransaction(i.transaction_code)}>Detail</Button>
                                                    <Button variant='outline' colorScheme='blue' onClick={() => setCode(i.transaction_code)}>Upload Receipt</Button>
                                                    <Button ml={2} colorScheme='red' onClick={() => cancelTransaction(i.transaction_code)}><Icon as={BsTrash} h={5} w={5} alignSelf={'center'} /></Button>

                                                </>
                                                }
                                            </CardFooter>
                                        </Card>
                                    )}
                                </Grid>
                            </CardBody>
                        </Card>
                    </Stack>
                </CardBody>
            </Card>
        </Container>

    )
}

export default WaitingPayment