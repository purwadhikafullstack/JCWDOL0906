import {
    Flex,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Icon,
    Button,
    chakra,
    useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { BsCartPlus, BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { rupiah, swalFailed } from '../../../helper';
import { add } from '../../../redux/cartSlice';
import axios from 'axios'
import { useEffect, useState } from 'react';


function ProductCard({ image, product_name, price, id, category, description, dose, indication, rules, unit, category_id }) {
    const toast = useToast()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    let param = '?image=' + image + '&product_name=' + product_name + '&price=' + price + '&category=' + category + '&description=' + description + '&dose=' + dose + '&indication=' + indication + '&rules=' + rules + '&unit=' + unit + '&category_id=' + category_id
    const user = useSelector((state) => state.userSlice)
    const addToCart = async () => {
        // user.value.is_verified ? dispatch(add({ name: product_name, image: image, price: price, id: id, category: category.category_name, qty: 1, total_price: price }))
        //     : alert("Login or verify you're account to continue.")
        setLoading(true)
        try {
            const result = await axios.post(process.env.REACT_APP_API_BASE_URL + '/cart', {
                product_id: id,
                qty: 1,
                price: price
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
            setLoading(false)
        } catch (error) {
            console.log(error)
            if (error.response.data.message === 'Unauthorized') swalFailed('Login to your account, please!')
            setLoading(false)
        }
    }

    const getCart = async () => {
        try {
            const result = await axios.get(process.env.REACT_APP_API_BASE_URL + '/cart?page=1', {
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

    useEffect(() => {
        getCart()
    }, [])

    return (
        <Flex p={5} w="240px" alignItems="center" justifyContent="center">
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                maxW="100%"
                borderWidth="1px"
                rounded="sm"
                shadow="sm"
                position="relative">

                <Image
                    src={image}
                    alt={`Picture of ${product_name}`}
                    roundedTop="lg"
                    onClick={() => { navigate('../store/product/detail/' + id + param, { replace: true }) }}
                />

                <Box p="3">
                    <Box d="flex" alignItems="baseline">

                        <Badge rounded="full" px="2" fontSize="10px" colorScheme="red">
                            {category}
                        </Badge>

                    </Box>
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        <Box
                            fontSize="sm"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated>
                            {product_name}
                        </Box>
                    </Flex>

                    <Flex justifyContent="space-between" alignContent="center">
                        {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
                        <Box fontSize="md" color={useColorModeValue('gray.800', 'white')}>

                            {rupiah(price)}
                        </Box>
                    </Flex>

                    {loading ? <Button w='100%' mt={2} colorScheme='linkedin' d='flex' isLoading
                        loadingText='Submitting' justifyContent='space-between' fontWeight='200'>
                        Add to cart <Icon as={BsCartPlus} h={5} w={5} ml={2} alignSelf={'center'} />
                    </Button> : <Button w='100%' mt={2} colorScheme='linkedin' d='flex' justifyContent='space-between' fontWeight='200' onClick={() => addToCart()}>
                        Add to cart <Icon as={BsCartPlus} h={5} w={5} ml={2} alignSelf={'center'} />
                    </Button>}


                </Box>
            </Box>
        </Flex>
    );
}

export default ProductCard;
