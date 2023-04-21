import React, { useState, useEffect, ChangeEventHandler, FormEventHandler } from 'react';
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import {useNavigate, Navigate} from "react-router-dom"
import { auth } from '../../config/firebaseConfig/firebaseConfig';
import {
    Flex,
    Text,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    useToast
} from "@chakra-ui/react"
import { useAuth } from '../../context/AuthProvider';

const ResetPasswordConfirmation = ({ oobCode }: { oobCode: any}) => {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()
  const toast = useToast()
  const { setResponse } = useAuth();

  useEffect(() => {
    const verifyPasswordResetCode2 = async () => {
      try {
        await verifyPasswordResetCode(auth, oobCode);
      } catch (error) {
        setError('La URL de restablecimiento de contraseña es inválida o ha expirado.');
      }
    };

    verifyPasswordResetCode2();
  }, [oobCode]);


  async function confirm(){
    //   navigate("/")
      await confirmPasswordReset(auth,oobCode, newPassword).then(() => {
        navigate("/")
      })
      setSuccess(true)
  }

//   console.log(success)
  const handlePasswordChange: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await confirmPasswordReset(auth,oobCode, newPassword)
      setSuccess(true)
      setTimeout(()=> {
            navigate("/")
      }, 4000)

    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewPassword(event.target.value);
  };



  return (
    <>

    {
        error.includes("expirado") ? <Text fontWeight={700} fontSize={28} px="20px" color="red.600">{error}</Text>
        :
        

    <Flex w="100%" h="100vh" bgColor="gray.700" justifyContent="center" alignItems="center" gap={3}  flexDir="column" color="white" >
      <Heading color="white" >Restablecer contraseña</Heading>
      { error && !error.includes("expirado") &&
        <Text fontWeight={700} fontSize={28} px="20px" color="red.600">{error}</Text>
        }
      {!success && (
        <Flex flexDir="column" as="form" onSubmit={handlePasswordChange} >
          <Text color="white" >Por favor, ingrese su nueva contraseña:</Text>
          {/* <form> */}
            <FormControl>
            <FormLabel>
              Nueva contraseña:
              <Input type="password" name="newPassword" value={newPassword} onChange={handleInputChange} />
            </FormLabel>
            <Button type="submit" bgColor="blue.500" _hover={{
                bgColor: "blue.400",
            }} >Cambiar contraseña</Button>
            </FormControl>
          {/* </form> */}
        </Flex>
      )}
      {success && <> 
        <Text color="green.600" fontSize={"22px"} fontWeight={700} >Su contraseña ha sido restablecida exitosamente. 
        </Text>
        <Text fontSize="24px" color="blue.500" >Porfavor espere! <br /> Será redireccionado automaticamente</Text>
      </>
      }
    </Flex>
    }

    </>
  );
};

export default ResetPasswordConfirmation;
