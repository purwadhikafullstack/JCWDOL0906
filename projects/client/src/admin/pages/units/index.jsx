import { Flex, useColorMode } from '@chakra-ui/react'
import React from 'react'
import Convertion from './conversion/form'
import ListConversionUnits from './conversion/list';
import Default from './default/form';
import ListDefaultUnits from './default/list';

const Units = () => {
    const { colorMode } = useColorMode();
    return (
        <Flex direction='column' pt={{ base: "120px", md: "120px", lg: "100px" }}>
            <Flex
                direction={{ sm: "column", md: "row" }}
                mb='24px'
                justifyContent={{ sm: "center", md: "space-around" }}
                align='center'
                backdropFilter='blur(21px)'
                // boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
                // // border='1.5px solid'
                // bg={colorMode === "dark" ? "navy.900" : "#fff"}
                // borderColor={borderProfileColor}
                // bg={bgProfile}
                p='24px'
                borderRadius='20px'>
                <ListDefaultUnits />
                <ListConversionUnits />
            </Flex>
        </Flex>
    )
}

export default Units