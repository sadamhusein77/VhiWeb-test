"use client";

import GeneralButton from "@/components/atoms/button";
import { validateLogin } from "@/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function NotFound() {
  const [isLogin, setIslogin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const dataToken = validateLogin();
    if (dataToken) {
      setIslogin(true);
    }
  }, []);

  const handleClickButton = useCallback(() => {
    router.push(`${isLogin ? "/users" : "/"}`);
  }, [isLogin]);

  return (
    <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
      <img
        src="/img/not-found-img.png"
        alt="img-not=found"
        className="rounded-lg w-60 h-60"
      />
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <GeneralButton
        label={isLogin ? "Kembali" : "Login"}
        variant="text"
        size="medium"
        className="!text-sky-500"
        handleOnClick={handleClickButton}
      />
    </div>
  );
}
