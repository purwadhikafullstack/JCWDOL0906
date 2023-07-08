import { Box, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Navbar } from '../../../components/navbar'
import List from './list'

const ShoppingCart = () => {
    return (
        // bg = { useColorModeValue("blue.50", "blue.100") }
        <Box >
            <Navbar />
            <div className="home-container">
                <List />
            </div>
        </Box>
    )
}

export default ShoppingCart