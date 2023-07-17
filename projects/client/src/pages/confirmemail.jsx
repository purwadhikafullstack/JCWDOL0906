import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { Field, ErrorMessage, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { apiRequest } from '../helper/api';

export const ConfirmEmail = () => {
  let navigate = useNavigate();
  const ConfirmSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is Required'),
  });

  const confirmEmail = async (values) => {
    try {
      const url = '/auth/confirm-email';
      console.log(values);
      const result = await apiRequest.post(url, values);
      console.log(result);

      Swal.fire({
        icon: 'success',
        title: 'Confirm Email Success',
        text: `${result.data.message}`,
        customClass: {
          container: 'my-swal',
        },
      });

      setTimeout(() => {
        navigate("/");
      }, 4000);

    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed Attempt',
        text: error.response.data.message,
        customClass: {
          container: 'my-swal',
        },
      });
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('blue.50', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} color="blue.800" fontSize={{ base: '2xl', md: '3xl' }}>
          Forgot Your Password?
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}
        >
          You&apos;ll get an email with a reset password
        </Text>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={ConfirmSchema}
          onSubmit={(values) => confirmEmail(values)}
        >
          <Form>
            <Field name="email">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email && form.touched.email} id="email">
                  <Input
                    {...field}
                    placeholder="your-email@example.com"
                    _placeholder={{ color: 'gray.600' }}
                    type="email"
                  />
                  <ErrorMessage name="email" component="div" color="red" />
                </FormControl>
              )}
            </Field>

            <Stack spacing={6}>
              <Button
                type="submit"
                bg={'blue.800'}
                color={'white'}
                _hover={{
                  bg: 'blue.800',
                }}
              >
                Request Reset
              </Button>
            </Stack>
          </Form>
        </Formik>
      </Stack>
    </Flex>
  );
};
