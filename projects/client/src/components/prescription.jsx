import { Button, Heading, Stack, VStack, Image, Card, CardHeader, CardBody, CardFooter, Text, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import prescription2 from "../../src/assets/prescription2.jpg"
import ModalPrescription from "../pages/user/prescription/prescriptionpage";

export const Prescriptions = (props) => {

    return (
       
       <Card
        mb={3} ml={5} mr={5}
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
  border='1px solid'
  borderColor='blue.800'
>
  <Image
    objectFit='cover'
    borderRadius={"sm"}
    maxW={{ base: '100%', sm: '520px' }}
    src={prescription2}
    alt=''
  />

  <Stack spacing={3} mb={5}>
    <CardBody>
      <Heading as='h4' size='xl' color='blue.900'>Punya Resep Dari Dokter?</Heading>
      <Text py='3' fontSize='18px' fontWeight='bold'>
        Tebus Resep Dokter, Online dan Tanpa Antri!
        G-Medsnial memberikan kemudahan bagi Anda untuk tebus obat resep tanpa antri secara online. 
      </Text>
      <ModalPrescription/>
    </CardBody>
    <CardFooter>
    </CardFooter>
  </Stack>
</Card>
    )

};


export default Prescriptions;
