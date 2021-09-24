import { useContext, useState } from 'react'
import AuthLayout from '../layouts/auth'
import AuthStore from '../stores/authStore'
import { Container, VStack } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import { Field, Form, Formik } from 'formik';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/toast';
import * as Yup from 'yup';

const Login = () => {  
  const authStore = useContext(AuthStore)
  const router = useRouter()
  
  const [showPassword, setShowPassword] = useState(false)
  const toast = useToast()

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const loginFormValidationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const submitLoginForm = async (values, { setSubmitting }) => {
    setSubmitting = true

		try {
			await authStore.login(values.username, values.password)

			toast({
				title: "Login success.",
				description: "You've been successfully logged in.",
				status: "success",
				duration: 3000,
				isClosable: true,
			})

      router.push('/admin')
		} catch (error) {
			toast({
				title: "Login failed.",
				description: `Failed to log in. Reason: ${error.message}`,
				status: "error",
				duration: 3000,
				isClosable: true,
			})	
		}

    setSubmitting = false
	}

  return (
    <AuthLayout title='Login'>
      NestCMS | Login
      <Container>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginFormValidationSchema}
          onSubmit={submitLoginForm}
        >
          {({ isSubmitting }) => (
            <Form>
              <VStack>
                <Field type="text" name="username">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.username && form.touched.username}>
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <Input {...field} id="username" placeholder="JohnDoe" />
                      <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field type="password" name="password">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <InputGroup
                       size="md">
                        <Input
                          {...field} id="password" 
                          pr="4.5rem"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                            {showPassword ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button type="submit" isLoading={isSubmitting}>
                  Log in
                </Button>
              </VStack>
            </Form>
            )}
          </Formik>
      </Container>
    </AuthLayout>
  )
};

export default Login;
