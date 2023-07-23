import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { apiRequest } from '../helper/api';

export const ResetPassword = () => {
  let navigate = useNavigate();
  let { token } = useParams();

  const ResetSchema = Yup.object().shape({
    password: Yup.string().required('Password is Required'),
    confirmPassword: Yup.string()
      .required('Password Confirmation is Required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const resetPassword = async (values) => {
    try {
      const url = '/auth/reset-password/:token';
      if (token) {
        const response = await apiRequest.post(
          url,
          {
            password: values.password,
            confirmPassword: values.confirmPassword,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        alert(response.data.message);
        setTimeout(() => {
          navigate('/');
        }, 4000);
      }
      Swal.fire({
        icon: 'success',
        title: 'Reset Password Succes',
        // text: response.data.message,
        customClass: {
          container: 'my-swal',
        },
      });

    } catch (error) {
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
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('white', 'gray.800')}>
      <Stack spacing={4} w={'full'} maxW={'md'} bg={useColorModeValue('blue.50', 'gray.700')} rounded={'xl'} boxShadow={'lg'} p={6} my={12}>
        <Heading lineHeight={1.1} color="blue.800" fontSize={{ base: '2xl', md: '3xl' }}>
          Enter New Password
        </Heading>
        <Formik initialValues={{ password: '', confirmPassword: '' }} validationSchema={ResetSchema} onSubmit={(values) => resetPassword(values)}>
          {({ isSubmitting }) => (
            <Form>
              <FormControl id="newpassword" isRequired>
                <FormLabel>New Password</FormLabel>
                <Field name="password">
                  {({ field }) => (
                    <Input {...field} placeholder="New Password" _placeholder={{ color: 'gray.800' }} type="password" />
                  )}
                </Field>
                <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
              </FormControl>
              <FormControl id="passwordconfirmation" isRequired>
                <FormLabel>Password Confirmation</FormLabel>
                <Field name="confirmPassword">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="Password Confirmation"
                      _placeholder={{ color: 'gray.800' }}
                      type="password"
                    />
                  )}
                </Field>
                <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />
              </FormControl>
              <Stack spacing={6}>
                <Button type="submit" bg={'blue.800'} color={'white'} _hover={{ bg: 'blue.800' }} isLoading={isSubmitting}>
                  Submit
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
};