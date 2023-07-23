import { Box, HStack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import FooterUserPage from '../../../components/footer'
import { Navbar } from '../../../components/navbar'
import UserProductList from './list'

const UserProduct = () => {
    return (
        <Box bg={useColorModeValue("blue.50", "blue.100")}>
            <Navbar />
            <div className="home-container">
                <UserProductList />
            </div>
            <FooterUserPage />
        </Box>
    )
};
export default UserProduct