import { Flex, Grid } from '@chakra-ui/react'
import React from 'react'
import ListConversionUnits from './conversion/list';
import ListDefaultUnits from './default/list';

const Units = () => {
    return (
        <Flex direction='column' pt={{ base: "120px", md: "120px", lg: "100px" }}>

            <Grid
                templateColumns={{ sm: "1fr", lg: "1fr 1fr" }}
                templateRows={{ lg: "repeat(2, auto)" }}
                gap='20px'>
                <ListDefaultUnits />
                <ListConversionUnits />
            </Grid>
        </Flex>
    )
}

export default Units