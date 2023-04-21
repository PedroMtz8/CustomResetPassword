import React, { useEffect } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import ResetPasswordConfirmation from './ResetPasswordConfirmation';
import {
    Text,
    Flex
} from "@chakra-ui/react"

const ResetPassword = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const mode = searchParams.get('mode');
  const oobCode = searchParams.get('oobCode');
  const resetPassword = searchParams.get('resetPassword');
  const navigate = useNavigate()

  // function redirect(){
  //   resetPassword ? 
  // }
  console.log(resetPassword)

  useEffect(() => {
    resetPassword ? navigate("/") : null
  },[])


  return (
    <>
    {
      // resetPassword ? <Navigate to="/" /> :
      <Flex w="100%" h="100vh" justifyContent="center" alignItems="center" bgColor="gray.700" > 
      {mode === 'resetPassword' && oobCode && <ResetPasswordConfirmation oobCode={oobCode} />}
      {(!mode || !oobCode) && <Text color="white" >La URL de restablecimiento de contraseña es inválida.</Text>}
    </Flex>
    }
    </>
  );
};

export default ResetPassword;
``
