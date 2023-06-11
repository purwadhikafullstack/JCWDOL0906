import React from 'react'
import {
    FormControl,
    FormLabel,
    // FormErrorMessage,
    // FormHelperText,
    Input, Card, CardHeader, CardBody, CardFooter, Button, Flex, Text, useColorModeValue, useColorMode
} from '@chakra-ui/react'

const Convertion = () => {
    const { colorMode } = useColorMode();
    const textColor = useColorModeValue("gray.700", "white");
    return (

        <Flex justify='center' backdropFilter='blur(21px)'
            boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
            bg={colorMode === "dark" ? "navy.900" : "#fff"}
            p='24px'
            borderRadius='20px'>
            <Card w='md' >
                <CardHeader><Text
                    fontSize={{ sm: "lg", lg: "xl" }}
                    color={textColor}
                    fontWeight='bold'
                    ms={{ sm: "8px", md: "0px" }}>
                    Conversion Unit
                </Text></CardHeader>
                <CardBody>
                    <FormControl marginBottom='2'>
                        <FormLabel>Unit</FormLabel>
                        <Input type='text' placeholder='Unit' bgColor='white' />
                        {/* <FormHelperText>We'll never share your eml.</FormHelperText> */}
                    </FormControl>

                </CardBody>
                <CardFooter><Button color='white' bgColor='blue.500'>Submit</Button></CardFooter>
            </Card>
        </Flex>



    )
}

export default Convertion