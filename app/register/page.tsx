"use client";

import GeneralButton from "@/components/atoms/button";
import InputForm from "@/components/atoms/inputForm";
import { validateEmail } from "@/helper";
import { IUserRegister } from "@/services/data-types";
import { userRegister } from "@/services/reqResServices";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const listErrMessage: Record<string, string> = {
  username: "Username harus diisi",
  email: "Email harus diisi",
  emailInvalid: "Email tidak valid",
  password: "Password harus diisi",
  passwordInvalid: "Password min 3 karakter",
  passwordNotMatch: "Password tidak sama dengan konfirmasi password"
}

export default function Register() {
  const [formRegister, setFormRegister] = useState<IUserRegister>({
    username: '',
    email: '',
    password: '',
  });
  const [errFormRegister, setErrFormRegister] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isPassword, setIsPassword] = useState<boolean>(true)
  const [isPassword2, setIsPassword2] = useState<boolean>(true)
  const [confirmPassword, setConfirmPassword] = useState('')

  const router = useRouter()

  const handleOnChangeForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormRegister((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [formRegister]
  );

  const handleCheckForm = useCallback(
    () => {
      const {email, password, username} = formRegister

      let errEmail: string = '',
          errPassword: string = '',
          errUsername: string = '',
          errConfirmPass: string = ''

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
      if (password.trim() !== "" && password.length < 3) {
        errPassword = listErrMessage.passwordInvalid
      }
      if (password !== confirmPassword) {
        errConfirmPass = listErrMessage.passwordNotMatch
      }
      if (username.trim() === "") {
        errUsername = listErrMessage.username
      }

      setErrFormRegister((prev) => ({
        ...prev,
        username: errUsername,
        email: errEmail,
        password: errPassword,
        confirmPassword: errConfirmPass
      }))

      if(errEmail === '' && errPassword === '' && errUsername === '' && errConfirmPass === '') {
        return true
      } else {
        return false
      }

    },
    [formRegister, confirmPassword],
  )
  
  const handleSubmitForm = useCallback(async () => {
    const isValidData = handleCheckForm()
    if(isValidData) {
      try {
        const response = await userRegister(formRegister)
        console.log('res', response)
      } catch (error) {
        console.log('error', error)
      }
    }

  }, [formRegister]);

  const handlePreviewPassword = useCallback(
    (id: number) => {
      id === 1
        ? isPassword
          ? setIsPassword(false)
          : setIsPassword(true)
        : id === 2 ? isPassword2
        ? setIsPassword2(false)
        : setIsPassword2(true)
        :
        null
    },
    [isPassword, isPassword2]
  );

  const handleToLogin = useCallback(
    () => {
        router.push('/')
    },
    [],
  )
  
  

  return (
    <main className="w-screen h-screen flex items-center justify-center p-2">
      <div className="bg-white rounded-lg p-4 py-8 shadow-inner w-full h-auto md:max-w-[400px] flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-center">Register</h3>
        <InputForm
          label="Username"
          type="text"
          handleOnChange={handleOnChangeForm}
          value={formRegister.username}
          infoText={errFormRegister.username}
          onKeyUp={handleSubmitForm}
          isError={errFormRegister.username !== ''}
          variant="outlined"
          name="username"
        />
        <InputForm
          label="Email"
          type="email"
          handleOnChange={handleOnChangeForm}
          value={formRegister.email}
          infoText={errFormRegister.email}
          onKeyUp={handleSubmitForm}
          isError={errFormRegister.email !== ''}
          variant="outlined"
          name="email"
        />
        <InputForm
          label="Password"
          type={isPassword ? 'password' : 'text'}
          handleOnChange={handleOnChangeForm}
          value={formRegister.password}
          infoText={errFormRegister.password}
          onKeyUp={handleSubmitForm}
          isError={errFormRegister.password !== ''}
          variant="outlined"
          name="password"
          propsInput={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handlePreviewPassword(1)}
                  edge="end"
                >
                  {isPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <InputForm
          label="Konfirmasi Password"
          type={isPassword2 ? 'password' : 'text'}
          handleOnChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          infoText={errFormRegister.confirmPassword}
          onKeyUp={handleSubmitForm}
          isError={errFormRegister.confirmPassword !== ''}
          variant="outlined"
          name="password2"
          propsInput={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handlePreviewPassword(2)}
                  edge="end"
                >
                  {isPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className="flex items-center justify-between mt-6">
          <GeneralButton
            label="Login"
            handleOnClick={handleToLogin}
            variant="text"
            className="text-sky-500"
          />
          <GeneralButton
            label="Submit"
            handleOnClick={handleSubmitForm}
            className="bg-sky-500 hover:bg-sky-600"
            variant="contained"
          />
        </div>
      </div>
    </main>
  );
}
