import { AvatarBadge, Badge, Box, Card, CardBody, CardHeader, Container, Flex, Heading, Spacer, Stack, StackDivider, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsChevronRight } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../../../helper/api'

const List = () => {
    const navigate = useNavigate()
    const [transaction, setTransaction] = useState([])
    const [code, setCode] = useState([])

    const getData = async () => {
        try {
            const result = await apiRequest.get("/transaction")

            setTransaction(result.data.data)
        } catch (error) {

        }
    }
    const getDataByCode = async () => {
        try {
            const result = await apiRequest.get("/transaction/" + code)

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
                    <Heading size='md'>Daftar Transaksi</Heading>
                </CardHeader>

                <CardBody>
                    <Stack spacing='4'>
                        {transaction.map(i => <Card variant='outline'>
                            <CardBody onClick={() => navigate('/mytransaction?status=' + i.status)} cursor='pointer'>
                                <Flex alignItems='center'>
                                    {i.status} <Spacer /> <Badge p={1} mr={3} variant='subtle' colorScheme={i.status === 'Menunggu Pembayaran' ? 'orange' : i.status === 'Menunggu Konfirmasi' ? 'teal' : i.status === 'Pembayaran' ? 'blue' : i.status === 'Diproses' ? 'purple' : i.status === 'Dibatalkan' ? 'red' : i.status === 'Dikirim' ? 'yellow' : 'green'} fontSize='1.2em' borderRadius='lg'>
                                        {i.n_status}
                                    </Badge><BsChevronRight cursor='pointer' onClick={() => navigate('/mytransaction?status=' + i.status)} />
                                </Flex>
                            </CardBody>
                        </Card>)}
                    </Stack>
                </CardBody>
            </Card>
        </Container>
    )
}
export default List