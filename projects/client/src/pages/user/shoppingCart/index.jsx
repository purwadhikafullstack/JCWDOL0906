import { Box, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import FooterUserPage from '../../../components/footer'
import { Navbar } from '../../../components/navbar'
import List from './list'

const ShoppingCart = () => {
    return (
        <Box bg={useColorModeValue("blue.50", "blue.100")}>
            <Navbar />
            <div className="home-container">
                <List />
            </div>
            <FooterUserPage />
        </Box>
    )
}

export default ShoppingCart