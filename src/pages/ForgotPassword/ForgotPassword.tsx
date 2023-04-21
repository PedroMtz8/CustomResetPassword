import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    Box,
    useToast
  } from '@chakra-ui/react';
import { FormEventHandler, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
  
  type ForgotPasswordFormInputs = {
    email: string;
  };
  
  export default function ForgotPassword(): JSX.Element {

    const [email, setEmail] = useState("")

    const {forgotPassword} = useAuth()
    const toast = useToast()

    const handleSubmit: FormEventHandler<HTMLFormElement | HTMLDivElement> = (e) =>{ 
      e.preventDefault();
      forgotPassword(email)
      setEmail(" ")
      toast({
        description: "Email sent successfully",
        status: "info",
        duration: 3000,
        position: "top"
      })

    }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        w="100%"
        justifyContent={'center'}
        bg={useColorModeValue('gray.700', 'gray.800')}>
            <Flex w="100%" as="form" justifyContent="center" px={{ base:"20px", md: "10px"}} onSubmit={handleSubmit} >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              type="submit"
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Request Reset
            </Button>
          </Stack>
        </Stack>
        </Flex>
      </Flex>
    );
  }