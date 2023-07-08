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
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsDashLg, BsPlusLg } from 'react-icons/bs';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { rupiah, swalFailed } from '../../../helper';
import { Navbar } from '../../navbar';
import ProductCard from './productCard';

export default function StoreProductDetail() {
    const location = useLocation()
    const [searchParams] = useSearchParams();
    const [product, setProduct] = useState([])
    const navigate = useNavigate();
    console.log(location.pathname.split('/'))
    const getData = async () => {
        let params = ""

        try {
            const result = await axios.get("http://localhost:8000/api/store/product?category=" + searchParams.get('category_id'))

            console.log(result.data)

            setProduct(result.data.data)
        } catch (error) {
            swalFailed(error.response.data.message)
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
                        <Box border='1px' w='sm'>
                            <Flex alignItems='center'>
                                <Button w='100%' size='sm' mr={2}><Icon as={BsPlusLg} h={5} w={5} alignSelf={'center'} /></Button>
                                <Text w='100%'>0</Text>
                                <Button w='100%' size='sm' ml={2}><Icon as={BsDashLg} h={5} w={5} alignSelf={'center'} /></Button>
                            </Flex>
                        </Box>
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
                            }}>
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
                                    <ProductCard image={i.image} product_name={i.product_name} price={i.price} id={i.id} category={i.category} description={i.description} dose={i.dose} indication={i.indication} rules={i.rules} unit={i.defaultUnit} category_id={i.category_id} /> : ""
                            )}


                        </Box>

                    </Stack>
                </SimpleGrid>


            </Container>
        </>
    );
}
