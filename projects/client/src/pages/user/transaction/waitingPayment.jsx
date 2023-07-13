import { AvatarBadge, Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Container, Flex, Grid, Heading, HStack, Image, Spacer, Stack, StackDivider, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsChevronRight } from 'react-icons/bs'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { formatDate, rupiah } from '../../../helper'
import { apiRequest } from '../../../helper/api'
const WaitingPayment = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [transaction, setTransaction] = useState([])
    const [code, setCode] = useState([])

    const getDataByStatus = async () => {
        try {
            const result = await apiRequest.get("/transaction/" + searchParams.get('status') + "/status")
            console.log(result.data.data)
            setTransaction(result.data.data)
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
                                                    <Text>{formatDate(i.createdAt)}</Text>
                                                </Flex>

                                            </CardHeader>
                                            <CardBody>
                                                <HStack>
                                                    <Card>
                                                        <CardBody>
                                                            <Heading size='md'>Metode Pembayaran : Bank Transfer</Heading>
                                                            <Flex spacing={2}>
                                                                <Center>
                                                                    <Image src='https://www.bca.co.id/-/media/Feature/Header/Header-Logo/logo-bca.svg?v=1' />
                                                                </Center>
                                                                <Spacer />
                                                                <Center>
                                                                    <Heading size='md'> 72345678911</Heading>
                                                                </Center>
                                                            </Flex>

                                                        </CardBody>
                                                    </Card>
                                                    <Card>
                                                        <CardBody>
                                                            Total Pembayaran : {rupiah(i.total_price)}
                                                        </CardBody>
                                                    </Card>
                                                </HStack>
                                            </CardBody>
                                            <CardFooter>
                                                <Button mr={2} colorScheme='blue'>Detail</Button>
                                                <Button variant='outline' colorScheme='blue'>Upload Receipt</Button>
                                            </CardFooter>
                                        </Card>
                                    )}
                                </Grid>
                            </CardBody>
                        </Card>
                    </Stack>
                    {/* <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        <Heading size='xs' textTransform='uppercase'>
                            Summary
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            View a summary of all your clients over the last month.
                        </Text>
                    </Box>
                    <Box>
                        <Heading size='xs' textTransform='uppercase'>
                            Overview
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            Check out the overview of your clients.
                        </Text>
                    </Box>
                    <Box>
                        <Heading size='xs' textTransform='uppercase'>
                            Analysis
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            See a detailed analysis of all your business clients.
                        </Text>
                    </Box>
                </Stack> */}
                </CardBody>
            </Card>
        </Container>
    )
}

export default WaitingPayment