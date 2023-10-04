"use client";

import GeneralButton from "@/components/atoms/button";
import InputForm from "@/components/atoms/inputForm";
import { validateEmail, validateLogin } from "@/helper";
import { IAuthLogin } from "@/services/data-types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const listErrMessage: Record<string, string> = {
  email: "Email harus diisi",
  emailInvalid: "Email tidak valid",
  password: "Password harus diisi",
}

const envEmail = process.env.NEXT_PUBLIC_EMAIL
const envPass = process.env.NEXT_PUBLIC_PASSWORD
const envToken = process.env.NEXT_PUBLIC_TOKEN_VHIWEB

export default function Home() {
  const [formLogin, setFormLogin] = useState<IAuthLogin>({
    email: '',
    password: '',
  });
  const [errFormLogin, setErrFormLogin] = useState<IAuthLogin>({
    email: '',
    password: '',
  });
  const [isPassword, setIsPassword] = useState<boolean>(true)
  const [isLoading, setIsloading] = useState<boolean>(false)

  const router = useRouter()

  const handleOnChangeForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormLogin((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [formLogin]
  );

  const handleCheckForm = useCallback(
    () => {
      const {email, password} = formLogin

      let errEmail: string = '',
          errPassword: string = ''

      if (email.trim() === "") {
        errEmail = listErrMessage.email
      }

      const checkValidateEmail = validateEmail(email)
      if (email.trim() !== "" && !checkValidateEmail) {
        errEmail = listErrMessage.emailInvalid
      }
      
      if (password.trim() === "") {
        errPassword = listErrMessage.password
      }

      setErrFormLogin((prev) => ({
        ...prev,
        email: errEmail,
        password: errPassword
      }))
      
      if(errEmail === '' && errPassword === '') {
        return true
      } else {
        return false
      }

    },
    [formLogin],
  )
  
  const handleSubmitForm = useCallback(async () => {
    const isValidData = handleCheckForm()
    const {email, password} = formLogin
    
    if(isValidData) {
      setIsloading(true)
      setTimeout(() => {
        if(email === envEmail && password === envPass) {
          Cookies.set('token-vhiweb', `${envToken}`, {expires: 7})
          router.push('/users')
        } else {
          toast.error('Email atau Password tidak sesuai')
        }
        setIsloading(false) 
      }, 2000);
    }

  }, [formLogin]);

  const handlePreviewPassword = useCallback(
    () => {
      isPassword ? setIsPassword(false) : setIsPassword(true)
    },
    [isPassword],
  )

  const checkStatusLogin = useCallback(
    () => {
     const dataToken = validateLogin()
     if(dataToken) {
       router.push('/users')
     } 
    },
    [],
  )
  
  useEffect(() => {
    checkStatusLogin()
  }, [])
  
  
  return (
    <main className="w-screen h-screen flex items-center justify-center p-2">
      <div className="bg-white rounded-lg p-6 py-8 shadow-inner w-full h-auto md:max-w-[400px] flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">VhiWEB</h3>
        <InputForm
          label="Email"
          type="email"
          handleOnChange={handleOnChangeForm}
          value={formLogin.email}
          infoText={errFormLogin.email}
          onKeyUp={handleSubmitForm}
          isError={errFormLogin.email !== ''}
          variant="outlined"
          name="email"
        />
        <InputForm
          label="Password"
          type={isPassword ? 'password' : 'text'}
          handleOnChange={handleOnChangeForm}
          value={formLogin.password}
          infoText={errFormLogin.password}
          onKeyUp={handleSubmitForm}
          isError={errFormLogin.password !== ''}
          variant="outlined"
          name="password"
          propsInput={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handlePreviewPassword}
                  edge="end"
                >
                  {isPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className="flex items-center justify-end mt-6">
          <GeneralButton
            label="Submit"
            handleOnClick={handleSubmitForm}
            className="!bg-sky-500 hover:!bg-sky-600"
            variant="contained"
            isDisabled={isLoading}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
}
