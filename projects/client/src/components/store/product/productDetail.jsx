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

export default function StoreProductDetail() {
    const location = useLocation()
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState({})

    const getDetail = async (req, res) => {
        const id = location.pathname.split("/")[4]
        try {
            const result = await axios.get('http://localhost:8000/api/store/product/detail/' + id)

            setDetail(result.data.dataValues)
        } catch (error) {
            swalFailed(error.response.data.message)
        }
    }

    useEffect(() => {
        getDetail()
    }, [])

    return (
        <>
            <Navbar />
            <Container maxW={'7xl'}>

                <Breadcrumb py={{ base: 10, md: 15 }}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='#' onClick={() => { navigate(-1) }}>Product</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'>{searchParams.get('product_name')}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <SimpleGrid
                    columns={{ base: 1, lg: 2 }}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 10, md: 15 }}>

                    <Flex direction='column'>
                        <Image
                            rounded={'md'}
                            alt={'product image'}
                            src={
                                searchParams.get('image')
                            }
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={{ base: '100%', sm: '400px', lg: '500px' }}
                        />
                        <Box border='1px' w='sm'>
                            <Flex alignItems='center'>
                                <Button w='100%' size='sm' mr={2}><Icon as={BsPlusLg} h={5} w={5} alignSelf={'center'} /></Button>
                                <Text w='100%'>0</Text>
                                <Button w='100%' size='sm' ml={2}><Icon as={BsDashLg} h={5} w={5} alignSelf={'center'} /></Button>
                            </Flex>
                        </Box>
                    </Flex>
                    <Stack spacing={{ base: 6, md: 10 }}>
                        <Box as={'header'}>
                            <Heading
                                lineHeight={1.1}
                                fontWeight={600}
                                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                                {searchParams.get('product_name')}
                            </Heading>
                            <Text
                                color={useColorModeValue('gray.900', 'gray.400')}
                                fontWeight={300}
                                fontSize={'2xl'}>
                                {rupiah(searchParams.get('price'))}
                            </Text>
                        </Box>

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
                                    color={useColorModeValue('yellow.500', 'yellow.300')}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    mb={'4'}>
                                    Description
                                </Text>

                                <Text fontSize={'lg'} textAlign='justify'>
                                    {detail.description}
                                </Text>
                            </Box>
                            <Box>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={useColorModeValue('yellow.500', 'yellow.300')}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    mb={'4'}>
                                    INDICATION
                                </Text>
                                <Text fontSize={'lg'} textAlign='justify'>
                                    {detail.indication}
                                </Text>
                            </Box>
                            <Box>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={useColorModeValue('yellow.500', 'yellow.300')}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    mb={'4'}>
                                    DOSES
                                </Text>
                                <Text fontSize={'lg'} textAlign='justify'>
                                    {detail.dose}
                                </Text>
                            </Box>
                            <Box>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={useColorModeValue('yellow.500', 'yellow.300')}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    mb={'4'}>
                                    RULES
                                </Text>
                                <Text fontSize={'lg'} textAlign='justify'>
                                    {detail.rules}
                                </Text>
                            </Box>
                        </Stack>

                        <Button
                            rounded={'none'}
                            w={'full'}
                            mt={8}
                            size={'lg'}
                            py={'7'}
                            bg={useColorModeValue('gray.900', 'gray.50')}
                            color={useColorModeValue('white', 'gray.900')}
                            textTransform={'uppercase'}
                            _hover={{
                                transform: 'translateY(2px)',
                                boxShadow: 'lg',
                            }}>
                            Add to cart
                        </Button>

                        <Stack direction="row" alignItems="center" justifyContent={'center'}>
                            <MdLocalShipping />
                            <Text>2-3 business days delivery</Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>


            </Container>
        </>
    );
}
