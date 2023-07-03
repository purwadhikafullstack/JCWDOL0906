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
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
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



function Rating({ rating, numReviews }) {
    return (
        <Box display="flex" alignItems="center">
            {Array(5)
                .fill('')
                .map((_, i) => {
                    const roundedRating = Math.round(rating * 2) / 2;
                    if (roundedRating - i >= 1) {
                        return (
                            <BsStarFill
                                key={i}
                                style={{ marginLeft: '1' }}
                                color={i < rating ? 'teal.500' : 'gray.300'}
                            />
                        );
                    }
                    if (roundedRating - i === 0.5) {
                        return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
                    }
                    return <BsStar key={i} style={{ marginLeft: '1' }} />;
                })}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {numReviews} review{numReviews > 1 && 's'}
            </Box>
        </Box>
    );
}

function ProductCard({ image, product_name, price, id, category }) {
    const navigate = useNavigate()
    let param = '?image=' + image + '&product_name=' + product_name + '&price=' + price + '&category=' + category

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
                    onClick={() => { navigate('detail/' + id + param) }}
                />

                <Box p="3">
                    <Box d="flex" alignItems="baseline">

                        <Badge rounded="full" px="2" fontSize="10px" colorScheme="red">
                            {category.category_name}
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
                        <Tooltip
                            label="Add to cart"
                            bg="Linkedin"
                            placement={'top'}
                            color={'gray.800'}
                            fontSize={'0.8em'}>
                            <chakra.a href={'#'} display={'flex'}>
                                <Icon as={FiShoppingCart} h={5} w={5} alignSelf={'center'} />
                            </chakra.a>
                        </Tooltip>
                    </Flex>

                    <Flex justifyContent="space-between" alignContent="center">
                        {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
                        <Box fontSize="md" color={useColorModeValue('gray.800', 'white')}>

                            {rupiah(price)}
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}

export default ProductCard;
