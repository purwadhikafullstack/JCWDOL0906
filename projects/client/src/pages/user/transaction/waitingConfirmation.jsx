import { AvatarBadge, Badge, Box, Card, CardBody, CardHeader, Container, Flex, Heading, Spacer, Stack, StackDivider, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsChevronRight } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../../../helper/api'

const WaitingConfirmation = () => {
    const navigate = useNavigate()
    const [transaction, setTransaction] = useState([])
    const [code, setCode] = useState([])

    const getData = async () => {
        try {
            const result = await apiRequest.get("/transaction")
            console.log(result.data.data)

            setTransaction(result.data.data)
        } catch (error) {

        }
    }

    const getDataByCode = async () => {
        try {
            const result = await apiRequest.get("/transaction/" + code)
            console.log(result.data.data)

        } catch (error) {

        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <Container maxW='container.xl' p={5} mt={5}>
            <Card variant='outline'>
                <CardHeader>
                    <Heading size='md'>Menunggu Konfirmasi</Heading>
                </CardHeader>

                <CardBody>
                    <Stack spacing='4'>
                        {transaction.map(i => <Card variant='outline'>
                            <CardBody>
                                <Flex alignItems='center'>
                                    {i.status} <Spacer /> <Badge p={1} mr={3} variant='subtle' colorScheme={i.status === 'Menunggu Pembayaran' ? 'orange' : i.status === 'Menunggu Konfirmasi' ? 'teal' : i.status === 'Pembayaran' ? 'blue' : i.status === 'Diproses' ? 'purple' : i.status === 'Dibatalkan' ? 'red' : i.status === 'Dikirim' ? 'yellow' : 'green'} fontSize='1.2em' borderRadius='lg'>
                                        {i.n_status}
                                    </Badge>
                                </Flex>
                            </CardBody>
                        </Card>)}
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

export default WaitingConfirmation