import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast
  } from '@chakra-ui/react';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import { useAuth } from '../../context/AuthProvider';
  
  export default function SignUp() {

    const [form, setForm] = useState({
        email: "",
        password: "",
        username: "",
    })
    const toast = useToast();
    const navigate = useNavigate()
    const {signUp} = useAuth()

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        try {
            signUp(form)
            toast({
                description: `El Usuario ${form.username} ha sido registrado correctamente`,
                duration: 3000,
                status: "success",
                position: "top"
            })
            console.log(form)
            navigate("/account  ")
        } catch (error: any) {
            toast({
                description: `${error.message}`,
                status: "error",
                duration: 3000,
                position: "top"
            })
        }
    }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={"gray.700"}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'} color="white">
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} >
              to enjoy all of our cool <Text as="span" color={'blue.400'}>features</Text> ✌️
            </Text>
          </Stack>
          <Box
          as="form"
          onSubmit={handleSubmit}
            rounded={'lg'}
            bg={useColorModeValue('gray.200', 'gray.300')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
            <FormControl id="email">
                <FormLabel>Username</FormLabel>
                <Input name="username" value={form.username} type="text" borderColor="gray.400" onChange={handleChange} />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input name="email" value={form.email} type="email" borderColor="gray.400" onChange={handleChange} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input name="password" value={form.password} type="password" borderColor="gray.400" onChange={handleChange} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Flex flexDir="column" gap={2} >
                  <Link to="/" >
                    <Text color={'blue.400'} _hover={{
                        textDecor: "underline"
                    }} >
                    Have an account?
                    </Text>
                    </Link>
                  </Flex>
                </Stack>
                <Button
                type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }