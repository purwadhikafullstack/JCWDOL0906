import { Center, Flex, Card, Image} from "@chakra-ui/react";
import axios from "axios";
// import { LayoutGroupContext } from "framer-motion";
import { useState, useEffect } from "react";


export const Category = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        // console.log('categories',categories);
        async function fetchCategories(){
            try {
                const categoriesData = await axios.get('http://localhost:8000/api/categories' + `?size=10`);
                console.log('categoriesdata',categoriesData)
                setCategories(categoriesData.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategories()
    }, []);
    return (
        <Flex px={4} py={5}>
            {categories.map((category)=> (
                <Card p={2} m={3}>
                    <Image
                    src={category.image}
                    mb={-2}
                    p={7}
                    />
                    <Center fontSize='sm' fontWeight='bold' textAlign='center'>
                        {category.category_name}
                        
                    </Center>
                </Card>
            ))}
        </Flex>
    )
}

