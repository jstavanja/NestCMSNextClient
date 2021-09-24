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
import * as Yup from 'yup'

const Register = () => {  
  const authStore = useContext(AuthStore)
  const router = useRouter()
  
  const [showPassword, setShowPassword] = useState(false)
  const toast = useToast()

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const registrationFormValidationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    email: Yup.string().email('E-mail must be in the correct format').required("Required"),
    password: Yup.string().required("Required"),
    repeatPassword: Yup.string().required("Required").when("password", {
      is: val => (val && val.length > 0),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both passwords must match"
      )
    })
  });

  const submitRegistrationForm = async (values, { setSubmitting }) => {
    setSubmitting = true

		try {
			await authStore.register(values.username, values.email, values.password)

			toast({
				title: "Registered successfully.",
				description: "You've been successfully registered.",
				status: "success",
				duration: 3000,
				isClosable: true,
			})

      router.push('/admin')
		} catch (error) {
			toast({
				title: "Registration failed.",
				description: `Failed to register. Reason: ${error.message}`,
				status: "error",
				duration: 3000,
				isClosable: true,
			})	
		}

    setSubmitting = false
	}

  return (
    <AuthLayout title='Register'>
      NestCMS | Register
      <Container>
        <Formik
          initialValues={{ username: '', email: '', password: '', repeatPassword: '' }}
          validationSchema={registrationFormValidationSchema}
          onSubmit={submitRegistrationForm}
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
                <Field type="text" name="email">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                      <FormLabel htmlFor="email">E-mail</FormLabel>
                      <Input {...field} id="email" placeholder="john.doe@gmail.com" />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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
                <Field type="password" name="repeatPassword">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.repeatPassword && form.touched.repeatPassword}>
                      <FormLabel htmlFor="repeatPassword">Repeat password</FormLabel>
                      <InputGroup
                       size="md">
                        <Input
                          {...field} id="repeatPassword" 
                          pr="4.5rem"
                          type={showPassword ? "text" : "password"}
                          placeholder="Repeat password"
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                            {showPassword ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{form.errors.repeatPassword}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button type="submit" isLoading={isSubmitting}>
                  Register
                </Button>
              </VStack>
            </Form>
            )}
          </Formik>
      </Container>
    </AuthLayout>
  )
};

export default Register;
