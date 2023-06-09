import React from 'react'
import {
    FormControl,
    FormLabel,
    // FormErrorMessage,
    // FormHelperText,
    Input, Card, CardHeader, CardBody, CardFooter, Button, Container, Flex
} from '@chakra-ui/react'

const Convertion = () => {
    return (
        <Container bgColor='blue.50' width='full'>
            <Flex justify='center' >
                <Card w='md' >
                    <CardHeader>Form Conversion Unit</CardHeader>
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
        </Container>


    )
}

export default Convertion