import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
    Button,
} from '@chakra-ui/react';
import { BsCartPlus, BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { rupiah } from '../../../helper';

const data = {
    isNew: true,
    imageURL:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    name: 'Wayfarer Classic',
    price: 4.5,
    rating: 4.2,
    numReviews: 34,
};

function ProductCard({ image, product_name, price, id, category, description, dose, indication, rules, unit, category_id }) {
    const navigate = useNavigate()
    let param = '?image=' + image + '&product_name=' + product_name + '&price=' + price + '&category=' + category + '&description=' + description + '&dose=' + dose + '&indication=' + indication + '&rules=' + rules + '&unit=' + unit + '&category_id=' + category_id

    return (
        <Flex p={5} w="240px" alignItems="center" justifyContent="center">
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                maxW="100%"
                borderWidth="1px"
                rounded="sm"
                shadow="sm"
                position="relative">
                {data.isNew && (
                    <Circle
                        size="10px"
                        position="absolute"
                        top={2}
                        right={2}
                        bg="red.200"
                    />
                )}

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
                    <Button w='100%' mt={2} colorScheme='linkedin' d='flex' justifyContent='space-between' fontWeight='200'>
                        Add to cart <Icon as={BsCartPlus} h={5} w={5} ml={2} alignSelf={'center'} />
                    </Button>
                </Box>
            </Box>
        </Flex>
    );
}

export default ProductCard;
