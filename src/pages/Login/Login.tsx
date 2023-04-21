import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    // Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
  import {Link} from "react-router-dom"
  import {useToast} from "@chakra-ui/react"
  import { useAuth } from '../../context/AuthProvider';
  
  export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const toast = useToast()

    const {login, forgotPassword} = useAuth()

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        try{
            await login(form)
            console.log(form)
            toast({
                description: 'Logeado correctamente',
                duration: 3000,
                status: "success",
                position: "top"
            })
        }catch(e: any){
            toast({
                description: `${e.message}`,
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
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} color="white">Log in to your DEV account (CHANGE) </Heading>
            <Text fontSize={'lg'} color={'white'}>
              development <Text as="span" color={'blue.400'}>branch
              </Text> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            as="form" onSubmit={handleSubmit}
            bg={useColorModeValue('gray.200', 'gray.300')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}  >
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
                    <Link to="/forgotPassword" >
                    <Text color={'blue.400'}  _hover={{
                        textDecor: "underline", cursor: "pointer"
                    }}>
                    Forgot password?
                    </Text>
                        </Link>
                  <Link to="/signup" >
                    <Text color={'blue.400'} _hover={{
                        textDecor: "underline"
                    }} >
                    Haven't an account?
                    </Text>
                    </Link>
                  </Flex>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  type="submit"
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