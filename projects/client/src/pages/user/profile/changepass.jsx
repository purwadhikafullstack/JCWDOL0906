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
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { apiRequest } from '../../../helper/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export const ChangePassword = () => {
  const ChangeSchema = Yup.object().shape({
    password: Yup.string().required('Password is Required'),
    newPassword: Yup.string().required('New Password is Required'),
    confirmPassword: Yup.string()
      .required('Password Confirmation is Required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice)

  const changePassword = async (values) => {
    try {
      const { password, newPassword, confirmPassword } = values;
      const data = {
        password: password,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      };

      const url = '/auth/change-password';
      const response = await apiRequest.post(url, data, {
        headers: {
          authorization: `Bearer ${user.value.verification_token}`,
        },
      });

      alert(response.data.message);
      console.log(response);
        setTimeout(() => {
          navigate('/');
        }, 4000);

      Swal.fire({
        icon: 'success',
        title: 'Reset Password Success',
        customClass: {
          container: 'my-swal',
        },
      });
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
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('white', 'gray.800')}>
      <Stack spacing={4} w={'full'} maxW={'md'} bg={useColorModeValue('blue.50', 'gray.700')} rounded={'xl'} boxShadow={'lg'} p={6} my={12}>
        <Heading lineHeight={1.1} color="blue.800" fontSize={{ base: '2xl', md: '3xl' }}>
          Enter New Password
        </Heading>
        <Formik initialValues={{ password: '', newPassword: '', confirmPassword: '' }} validationSchema={ChangeSchema} onSubmit={(values) => changePassword(values)}>
          {({ isSubmitting }) => (
            <Form>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Field name="password">
                  {({ field }) => (
                    <Input {...field} placeholder="Password" type="password" />
                  )}
                </Field>
                <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
              </FormControl>
              <FormControl id="newPassword" isRequired>
                <FormLabel>New Password</FormLabel>
                <Field name="newPassword">
                  {({ field }) => (
                    <Input {...field} placeholder="New Password" type="password" />
                  )}
                </Field>
                <ErrorMessage name="newPassword" component="div" style={{ color: 'red' }} />
              </FormControl>
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Password Confirmation</FormLabel>
                <Field name="confirmPassword">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="Password Confirmation"
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
