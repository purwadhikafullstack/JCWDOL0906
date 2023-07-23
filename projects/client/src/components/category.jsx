import { Center, Flex, Card, Image } from "@chakra-ui/react";
import axios from "axios";
// import { LayoutGroupContext } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiRequest } from "../helper/api";
import { setCategory } from "../redux/productSlice";


export const Category = () => {
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function fetchCategories() {
            try {
                const categoriesData = await apiRequest.get("/categories?size=10");

                setCategories(categoriesData.data.data)
            } catch (error) {

            }
        }
        fetchCategories()
    }, []);
    return (
        <Flex px={4} py={5}>
            {categories.map((category) => (
                <Card p={2} m={3}>
                    <Image
                        src={process.env.REACT_APP_IMAGE_API + category.image}
                        mb={-2}
                        p={7}
                        onClick={() => { dispatch(setCategory({ category_id: category.id })); document.getElementById('product-list').scrollTo(0, 500) }}
                    />
                    <Center fontSize='sm' fontWeight='bold' textAlign='center'>
                        {category.category_name}

                    </Center>
                </Card>
            ))}
        </Flex>
    )
}

