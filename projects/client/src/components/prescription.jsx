import { Box, Button, Center, color, Flex, FormControl, Grid, GridItem, Heading, HStack, Icon, Input, InputGroup, InputRightElement, Stack, Text, textDecoration, VStack, Image } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { BsFileEarmarkImage } from "react-icons/bs"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { MdOutlineFileUpload } from "react-icons/md"
import { useNavigate } from "react-router-dom";


export const Prescriptions = (props) => {
    const navigate = useNavigate();
    const handlePrescription = () => {
        navigate("/prescription");
    }
    return (
            <VStack
                overflow='hidden'
                w= "95%"
                mx='auto'
            >
                    <Stack spacing={3} mb={5}>
                        <Heading as='h4' size='md' color='#213360' textAlign="center">Punya Resep Dari Dokter?</Heading>
                            <Button
                             variant="outline"
                             color="white"
                             bg="blue.900"
                             borderColor={props.border}
                             onClick={() => handlePrescription()}
                             fontSize={"md"}
                             >
                               Masukan Resep Anda
                            </Button>
                    </Stack>
            </VStack>
 )
};


export default Prescriptions