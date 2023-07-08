import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, Divider, Flex, Heading, HStack, Icon, Image, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { rupiah } from '../../../helper'
import { Link, useNavigate } from 'react-router-dom'
import { BsDash, BsDashCircle, BsDashLg, BsPlus, BsPlusCircle, BsPlusLg, BsTrash, BsTrash2 } from 'react-icons/bs'
import { FaArrowRight } from 'react-icons/fa'
import { add } from '../../../redux/cartSlice'

const List = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [carts, setCart] = useState([])
    const user = useSelector((state) => state.userSlice)
    const { cart, total_price } = useSelector((state) => state.cartSlice)
    const getCart = async () => {
        try {
            const result = await axios.get(process.env.REACT_APP_API_BASE_URL + '/cart?page=1', {
                headers: {
                    authorization: `Bearer ${user.value.verification_token}`,
                },
            })

            console.log(result.data.data)
            setCart(result.data.data)
            let data = result.data.data
            let total_qty = 0
            let total_price = 0
            data.forEach(i => { total_qty += i.qty; total_price += i.total_price })
            dispatch(add({ cart: total_qty, total_price: total_price }))
        } catch (error) {
            console.log(error)
        }
    }

    const updateItemQty = async (id, method) => {
        try {
            const result = await axios.patch(process.env.REACT_APP_API_BASE_URL + '/cart/' + id, {
                method: method
            }, {
                headers: {
                    authorization: `Bearer ${user.value.verification_token}`,
                },
            })

            console.log(result.data.data)
            getCart()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteItem = async (id, method) => {
        try {
            const result = await axios.delete(process.env.REACT_APP_API_BASE_URL + '/cart/' + id, {
                headers: {
                    authorization: `Bearer ${user.value.verification_token}`,
                },
            })

            console.log(result.data.data)
            getCart()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCart()
    }, [])

    const OrderSummaryItem = (props) => {
        const { label, value, children } = props
        return (
            <Flex justify="space-between" fontSize="sm">
                <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
                    {label}
                </Text>
                {value ? <Text fontWeight="medium">{value}</Text> : children}
            </Flex>
        )
    }
    return (
        <Box
            maxW={{ base: '3xl', lg: '7xl' }}
            mx="auto"
            px={{ base: '4', md: '8', lg: '12' }}
            py={{ base: '6', md: '8', lg: '12' }}
        >
            <Stack
                direction={{ base: 'column', lg: 'row' }}
                align={{ lg: 'flex-start' }}
                spacing={{ base: '8', md: '16' }}
            >
                <Stack spacing={{ base: '8', md: '10' }} flex="2">
                    <Heading fontSize="2xl" fontWeight="extrabold">
                        Shopping Cart ({cart} items)
                    </Heading>

                    <Stack spacing="6">
                        <Container maxW='container.xl' p={5} mt={5}>
                            {
                                carts.length > 0 ? carts.map(i => <Flex borderWidth="1px" rounded="lg" padding="2" width="full" mt={2} justifyContent='space-between' bgColor='white'>
                                    <HStack><Image
                                        rounded="lg"
                                        width="120px"
                                        height="120px"
                                        fit="cover"
                                        src={i.image}
                                        alt=''
                                        draggable="false"
                                        loading="lazy"
                                    />
                                        <Box pt="4">
                                            <Stack spacing="0.5">
                                                <Text fontWeight="medium">{i.product_name}</Text>
                                                <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
                                                    {rupiah(i.price)}
                                                </Text>
                                            </Stack>
                                        </Box>
                                    </HStack>

                                    <Flex alignItems='end'>
                                        <Button variant='ghost' w="fit-content" size='sm' ml={2} onClick={() => deleteItem(i.product_id, 'minus')}><Icon as={BsTrash} h={5} w={5} alignSelf={'center'} /></Button>

                                        <Box>
                                            <Flex alignItems='center'>
                                                <Button variant='ghost' w="fit-content" size='sm' ml={2} onClick={() => updateItemQty(i.product_id, 'minus')}><Icon as={BsDashCircle} h={5} w={5} alignSelf={'center'} /></Button>
                                                <Text px={3} fontWeight="medium">{i.qty}</Text>
                                                <Button variant='ghost' w="fit-content" size='sm' mr={2} onClick={() => updateItemQty(i.product_id, 'plus')}><Icon as={BsPlusCircle} h={5} w={5} alignSelf={'center'} /></Button>
                                            </Flex>
                                        </Box>
                                        {/* <Box pt="4">
                                            <Stack spacing="0.5">
                                                <Text fontWeight="medium">{i.total_price}</Text>
                                            </Stack>
                                        </Box> */}
                                    </Flex>

                                    {/* <Box>
                            <Button onClick={() => updateItemQty(i.product_id, 'plus')}> Tambah </Button>
                            <Text fontWeight="medium">{i.qty}</Text>
                            <Button onClick={() => updateItemQty(i.product_id, 'minus')}> Kurang </Button>
                        </Box> */}
                                    {/* <Box pt="4">
                            <Stack spacing="0.5">
                                <Text fontWeight="medium">{i.qty}</Text>
                            </Stack>z
                        </Box> */}

                                </Flex>) : 'Cart is Empty'
                            }

                        </Container>
                    </Stack>
                </Stack>

                <Flex direction="column" align="center" flex="1">
                    {/* <CartOrderSummary />
                    <HStack mt="6" fontWeight="semibold">
                        <p>or</p>
                        <Link color={mode('blue.500', 'blue.200')}>Continue shopping</Link>
                    </HStack> */}
                    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
                        <Heading size="md">Order Summary</Heading>

                        <Stack spacing="6">
                            <OrderSummaryItem label="Subtotal" value={rupiah(597)} />
                            <OrderSummaryItem label="Shipping + Tax">
                                <Link href="#" textDecor="underline">
                                    Calculate shipping
                                </Link>
                            </OrderSummaryItem>
                            <OrderSummaryItem label="Coupon Code">
                                <Link href="#" textDecor="underline">
                                    Add coupon code
                                </Link>
                            </OrderSummaryItem>
                            <Flex justify="space-between">
                                <Text fontSize="lg" fontWeight="semibold">
                                    Total
                                </Text>
                                <Text fontSize="xl" fontWeight="extrabold">
                                    {rupiah(total_price)}
                                </Text>
                            </Flex>
                        </Stack>
                        <Button colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
                            Checkout
                        </Button>
                    </Stack>
                </Flex>
            </Stack>
        </Box>
    )
}

export default List