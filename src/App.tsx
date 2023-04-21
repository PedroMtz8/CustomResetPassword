import {Route, Routes} from "react-router-dom"
import { Suspense, lazy } from 'react';
import { Progress } from "@chakra-ui/react"
// import Login from "./pages/Login/Login"
// import SignUp from "./pages/SignUp/SignUp"
// import AuthProvider from "./context/AuthProvider"
// import Account from "./pages/Account/Account"
// import ProtectedRoutes from "./context/ProtectedRoutes"
// import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"
// import ResetPassword from "./pages/ResetPasswordPage/ResetPasswordPage"

const Login = lazy(()=> import ("./pages/Login/Login"))
const SignUp = lazy(()=> import ("./pages/SignUp/SignUp"))
const AuthProvider = lazy(()=> import ("../src/context/AuthProvider"))
const Account = lazy(()=> import ("./pages/Account/Account"))
const ProtectedRoutes = lazy(()=> import ("../src/context/ProtectedRoutes"))
const ForgotPassword = lazy(()=> import ("./pages/ForgotPassword/ForgotPassword"))
const ResetPassword = lazy(()=> import ("./pages/ResetPasswordPage/ResetPasswordPage"))

function App() {

  return (
    <AuthProvider>
  <Suspense fallback={<LoadingBar2 />}>
      <Routes>
        
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
          <Route path="/reset-password" element={<ResetPassword/>} />

          <Route element={<ProtectedRoutes/>} >
              <Route path="/account" element={<Account/>} />
          </Route>

      </Routes>
          </Suspense>
    </AuthProvider>
  )
}

export default App


function LoadingBar() {
  return (
    <div id="loading-bar">
      <div id="loading-progress"></div>
    </div>
  );
}

function LoadingBar2() {
  return <Progress size="xl" w="100%" height="6px" colorScheme="red"  isIndeterminate />;
}
