import { AvatarBadge, Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Container, Divider, Flex, FormControl, FormLabel, Grid, Heading, HStack, Icon, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spacer, Stack, StackDivider, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
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
    const [userTransaction, setUserTransaction] = useState([])
    const [detailTransaction, setDetailTransaction] = useState([])
    const [code, setCode] = useState("")
    const [transactionId, setTransactionId] = useState(0)
    const [upload, setUpload] = useState(false)

    const getDataByStatus = async () => {
        try {
            const result = await apiRequest.get("/transaction/" + searchParams.get('status') + "/status")

            setTransaction(result.data.data)
        } catch (error) {

        }
    }
    const uploadBukti = async (e) => {
        try {
            let formData = new FormData()
            formData.append("image", e.files[0]);

            let result = await apiRequest.post("/transaction/" + e.id, formData);
            getDataByStatus();

            swalSuccess(result.data.message);
        } catch (error) {

            swalFailed(error.response.data.message);
        }
    };
    const getDetailTransaction = async (code) => {
        try {
            const result = await apiRequest.get("/transaction/" + code + "/code")
            setUserTransaction(result.data.data.transaction)
            setDetailTransaction(result.data.data.details)
            onOpen()
        } catch (error) {
        }
    }
    const cancelTransaction = async (code) => {
        try {
            const result = await apiRequest.delete("/transaction/" + code)
            getDataByStatus()
        } catch (error) {
        }
    }
    const jasaPengiriman = (shipping) => {
        if (shipping === 'tiki') {
            return <Image w='80px' src='https://www.tiki.id/images/logo.png' />
        } else if (shipping === 'jne') {
            return <Image w='80px' src='https://www.jne.co.id/frontend/images/material/logo.jpg' />
        } else {
            return <Image w='80px' src='https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/10/09/2138107074.jpg' />
        }
    }

    useEffect(() => {
        getDataByStatus()
    }, [])
    return (
        <Container maxW='container.xl' p={5} mt={5}>
            <Card variant='outline'>
                <CardHeader>
                    <Flex justify='space-between' align='center'>
                        <Heading size='md'>Menunggu Pembayaran</Heading>
                        <Flex alignItems='center'>
                            <Text mr={3} mb={0}> Status </Text>
                            <Select w='150px' placeholder='Pilih Status' onChange={(e) => navigate('/mytransaction?status=' + e.target.value)}>
                                <option value=''>Semua</option>
                                <option value='Menunggu Konfirmasi'>Menunggu Konfirmasi</option>
                                <option value='Proses Resep'>Proses Resep</option>
                                <option value='Menunggu Pembayaran'>Menunggu Pembayaran</option>
                                <option value='Pembayaran'>Pembayaran</option>
                                <option value='Diproses'>Diproses</option>
                                <option value='Dikirim'>Dikirim</option>
                                <option value='Pesanan Dikonfirmasi'>Diterima</option>
                                <option value='Dibatalkan'>Dibatalkan</option>
                            </Select>
                        </Flex>
                    </Flex>
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
                                                        <Input type='file' id={i.transaction_code} onChange={(e) => uploadBukti(e.target)} />
                                                        <Button ml={2} colorScheme='red' onClick={() => setCode("")}>X</Button>
                                                    </Flex>
                                                    <Button ml={2} colorScheme='red' onClick={() => cancelTransaction(i.transaction_code)}><Icon as={BsTrash} h={5} w={5} alignSelf={'center'} /></Button>
                                                </> : <>
                                                    <Button mr={2} colorScheme='blue' onClick={() => getDetailTransaction(i.transaction_code)}>Detail</Button>
                                                    <Button variant='outline' colorScheme='blue' onClick={() => { setCode(i.transaction_code); setTransactionId(i.id) }}>Upload Receipt</Button>
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
            <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Detail Transaksi</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack>
                            {userTransaction.map(i =>
                                <Card variant='outline' bg='blue.50'>
                                    <CardBody>
                                        <Text> Tujuan Pengiriman : {i.address_name}</Text>
                                    </CardBody>
                                </Card>
                            )}
                            <Divider />
                            <Card variant='outline' bg='blue.50'>
                                {detailTransaction.map((j, index) =>
                                    <CardBody key={index}>

                                        <Flex justify='space-between' align='center'>
                                            <Box pt="4">
                                                <Stack spacing="0.5">
                                                    <Text fontWeight="medium">{j.product_name}</Text>
                                                    <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
                                                        {j.qty} x {rupiah(j.price)}
                                                    </Text>
                                                </Stack>
                                            </Box>
                                            <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
                                                {rupiah(j.qty * j.price)}
                                            </Text>
                                        </Flex>
                                    </CardBody>
                                )}
                            </Card>
                            <Divider />
                            {userTransaction.map(i =>

                                <Card variant='outline' bg='blue.50'>
                                    <CardBody>
                                        <Text fontWeight='600'> Ongkos Pengiriman :</Text>
                                        <Flex justify='space-between' align='center'>
                                            {jasaPengiriman(i.shipping)}
                                            <Text>{rupiah(i.shipping_cost)}</Text>
                                        </Flex>
                                    </CardBody>
                                </Card>
                            )}
                            <Divider />
                            {userTransaction.map(i =>
                                <Card variant='outline' bg='blue.50'>
                                    <CardBody>

                                        <Flex justify='space-between' align='center'>
                                            <Text fontWeight='600'> Total Pembayaran :</Text>
                                            <Text>{rupiah(i.total_price)}</Text>
                                        </Flex>
                                    </CardBody>
                                </Card>
                            )}
                            <Divider />
                            {searchParams.get('status') === 'Menunggu Pembayaran' ?

                                <Card variant='outline' bg='blue.50'>
                                    <CardBody>
                                        <Text fontWeight='600'> Bukti Pembayaran :</Text>
                                        <Text fontWeight='500'> Silahkan upload bukti pembayaran anda.</Text>
                                    </CardBody>
                                </Card>
                                :
                                userTransaction.map(i =>
                                    <Card variant='outline' bg='blue.50'>
                                        <CardBody>
                                            <Text fontWeight='600'> Bukti Pembayaran :</Text>
                                            <Image height='120' src={process.env.REACT_APP_IMAGE_API + i.payment_receipt} />
                                        </CardBody>
                                    </Card>
                                )
                            }
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    )
}
export default WaitingPayment