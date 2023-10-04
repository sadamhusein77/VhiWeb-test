import Cookies from "js-cookie";

export function validateEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

export function validateLogin() {
  let statusLogin = false
  const dataToken = Cookies.get('token-vhiweb')
  if(dataToken === process.env.NEXT_PUBLIC_TOKEN_VHIWEB) {
    statusLogin = true
  }

  return statusLogin
}