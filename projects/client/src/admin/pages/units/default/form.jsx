import React, { useState } from 'react'
import axios from 'axios'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input, Card, CardHeader, CardBody, CardFooter, Button, Flex, Text, useColorModeValue, useColorMode
} from '@chakra-ui/react'
import { clearForm, swalFailed, swalSuccess } from '../../../utils';

const Default = () => {
    const { colorMode } = useColorMode();
    const textColor = useColorModeValue("gray.700", "white");

    const [input, setInput] = useState('0')
    const handleInputChange = (e) => setInput(e.target.value)
    const isError = input === ''

    const handleSubmit = async () => {
        try {
            let result = await axios.post("http://localhost:8000/api/unit/default", {
                unit: document.getElementById("unit").value
            })
            swalSuccess(result.data.message)
            clearForm(['unit'])
        } catch (error) {
            swalFailed(error.response.data.message)
        }
    }
    return (

        <Flex justify='center' boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
            bg={colorMode === "dark" ? "navy.900" : "#fff"}
            p='24px'
            borderRadius='20px'>
            <Card w='md' >
                <CardHeader><Text
                    fontSize={{ sm: "lg", lg: "xl" }}
                    color={textColor}
                    fontWeight='bold'
                    ms={{ sm: "8px", md: "0px" }}>
                    Default Unit
                </Text></CardHeader>
                <CardBody>

                    <FormControl marginBottom='2' isInvalid={isError}>
                        <FormLabel>Unit</FormLabel>
                        <Input type='text' placeholder='Unit' id="unit" bgColor='white' onChange={(e) => handleInputChange(e)} />
                        {/* <FormHelperText>We'll never share your eml.</FormHelperText> */}
                        {isError ? (
                            <FormErrorMessage>Field is required.</FormErrorMessage>
                        ) : (
                            ""
                        )}
                    </FormControl>

                </CardBody>
                <CardFooter><Button color='white' bgColor='blue.500' onClick={() => handleSubmit()}>Submit</Button></CardFooter>
            </Card>
        </Flex>



    )
}

export default Default