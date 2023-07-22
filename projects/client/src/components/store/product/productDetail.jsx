import { Icon } from '@chakra-ui/icons';
import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsDashLg, BsPlusLg } from 'react-icons/bs';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { rupiah, swalFailed } from '../../../helper';
import { apiRequest } from '../../../helper/api';
import { Navbar } from '../../navbar';
import ProductCard from './productCard';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../../redux/cartSlice';

export default function StoreProductDetail() {
    const user = useSelector((state) => state.userSlice)
    const dispatch = useDispatch()
    const toast = useToast()
    const location = useLocation()
    const [searchParams] = useSearchParams();
    const [product, setProduct] = useState([])
    const navigate = useNavigate();
    console.log(location.pathname.split('/'))
    const getData = async () => {
        let params = ""

        try {
            const result = await apiRequest.get("/store/product?category=" + searchParams.get('category_id'))

            console.log(result.data)

            setProduct(result.data.data)
        } catch (error) {
            swalFailed(error.response.data.message)
        }
    }

    const getCart = async () => {
        try {
            const result = await apiRequest.get('/cart?page=1', {
                headers: {
                    authorization: `Bearer ${user.value.verification_token}`,
                },
            })
            let data = result.data.data
            let total_qty = 0
            let total_price = 0
            data.forEach(i => { total_qty += i.qty; total_price += i.total_price })
            dispatch(add({ cart: total_qty, total_price: total_price }))
        } catch (error) {
            console.log(error)
        }
    }

    const addToCart = async () => {
        // user.value.is_verified ? dispatch(add({ name: product_name, image: image, price: price, id: id, category: category.category_name, qty: 1, total_price: price }))
        //     : alert("Login or verify you're account to continue.")

        try {
            const result = await apiRequest.post('/cart', {
                product_id: searchParams.get('id'),
                qty: 1,
                price: searchParams.get('price')
            }, {
                headers: {
                    authorization: `Bearer ${user.value.verification_token}`,
                },
            })
            getCart()
            toast({
                title: '',
                description: "Barang berhasil ditambahkan ke keranjang",
                status: 'success',
                duration: 2000,
                position: 'top',
                isClosable: true,
            })

        } catch (error) {
            console.log(error)
            if (error.response.data.message === 'Unauthorized') swalFailed('Login to your account, please!')
            if (error.response.status === 400) {
                toast({
                    title: '',
                    description: error.response.data.message,
                    status: 'error',
                    duration: 2000,
                    position: 'top',
                    isClosable: true,
                })
            }
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <Navbar />
            <Container maxW={'8xl'}>

                <Breadcrumb py={{ base: 10, md: 15 }}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='#' onClick={() => { navigate('../store/product', { replace: true }) }}>Product</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'>{searchParams.get('product_name')}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <SimpleGrid
                    columns={{ base: 1, lg: 3 }}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 10, md: 15 }}>

                    <Stack spacing={{ base: 6, md: 10 }}>
                        <Image
                            rounded={'md'}
                            alt={'product image'}
                            src={
                                searchParams.get('image')
                            }
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={{ base: '100%', sm: '200px', lg: '300px' }}
                        />

                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={'column'}
                            divider={
                                <StackDivider
                                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                                />
                            }>

                        </Stack>
                    </Stack>
                    <Stack spacing={{ base: 6, md: 10 }}>
                        <Box as={'header'}>
                            <Heading
                                lineHeight={1.1}
                                fontWeight={600}
                                fontSize={{ base: '2l', sm: '4l', lg: '5l' }}>
                                {searchParams.get('product_name')}
                            </Heading>
                            <Text
                                color={useColorModeValue('gray.900', 'gray.400')}
                                fontWeight={300}
                                fontSize={'2xl'}>
                                {rupiah(searchParams.get('price'))}
                                <Text
                                    color={useColorModeValue('gray.500', 'gray.100')}
                                    fontWeight={300}
                                    fontSize={'2xl'}>
                                    Per {searchParams.get('unit')}
                                </Text>
                            </Text>

                        </Box>
                        <Button
                            rounded={'none'}
                            w={'full'}
                            mt={8}
                            size={'lg'}
                            py={'7'}
                            // bg={useColorModeValue('gray.900', 'gray.50')}
                            colorScheme='linkedin'
                            color={useColorModeValue('white', 'gray.900')}
                            textTransform={'uppercase'}
                            _hover={{
                                transform: 'translateY(2px)',
                                boxShadow: 'lg',
                            }}
                            onClick={() => addToCart()}>
                            Add to cart
                        </Button>
                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={'column'}
                            divider={
                                <StackDivider
                                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                                />
                            }>

                            <Box>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={useColorModeValue('blue.500', 'blue.300')}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    mb={'4'}>
                                    Description
                                </Text>

                                <Text fontSize={'md'} textAlign='justify'>
                                    {searchParams.get('description')}
                                </Text>
                            </Box>
                            <Box>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={useColorModeValue('blue.500', 'blue.300')}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    mb={'4'}>
                                    INDICATION
                                </Text>
                                <Text fontSize={'md'} textAlign='justify'>
                                    {searchParams.get('indication')}
                                </Text>
                            </Box>
                            <Box>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={useColorModeValue('blue.500', 'blue.300')}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    mb={'4'}>
                                    DOSES
                                </Text>
                                <Text fontSize={'md'} textAlign='justify'>
                                    {searchParams.get('dose')}
                                </Text>
                            </Box>
                            <Box>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={useColorModeValue('blue.500', 'blue.300')}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    mb={'4'}>
                                    RULES
                                </Text>
                                <Text fontSize={'md'} textAlign='justify'>
                                    {searchParams.get('rules')}
                                </Text>
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack ml={40}>
                        <Text
                            fontSize={{ base: '12px', lg: '13px' }}
                            color={useColorModeValue('blue.500', 'blue.300')}
                            fontWeight={'600'}
                            mb={'4'}>
                            PRODUK LAIN CATEGORI INI :
                        </Text>
                        <Box p={1} shadow='md' borderWidth='1px'>
                            {product.map(i =>

                                i.id !== Number(location.pathname.split("/")[4]) ?
                                    <ProductCard image={process.env.REACT_APP_IMAGE_API + i.image} product_name={i.product_name} price={i.price} id={i.id} category={i.category} description={i.description} dose={i.dose} indication={i.indication} rules={i.rules} unit={i.defaultUnit} category_id={i.category_id} /> : ""
                            )}


                        </Box>

                    </Stack>
                </SimpleGrid>


            </Container>
        </>
    );
}
