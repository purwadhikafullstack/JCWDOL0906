import { Box, HStack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import FilterProduct from '../../../components/filterProduct'
import { Navbar } from '../../../components/navbar'
import UserProductList from './list'

const UserProduct = () => {
    return (
        <Box bg={useColorModeValue("blue.50", "blue.100")}>
            <Navbar />
            <div className="home-container">
                {/* <SimpleSlider/> */}
                <UserProductList />
            </div>
        </Box>
    )
}

export default UserProduct