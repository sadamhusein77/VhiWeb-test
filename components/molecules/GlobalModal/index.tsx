import React from "react";
import RawDialog from "../RawDialog";
import GeneralButton from "@/components/atoms/button";

interface IPropsGlobalModal {
  isOpen?: boolean;
  handleClickButton: () => void;
}
export default function GlobalModal({
  isOpen,
  handleClickButton,
}: IPropsGlobalModal) {
  return (
    <RawDialog isOpen={isOpen}>
      <div className="flex flex-col justify-center items-center gap-4 p-8">
        <img
          src="/img/error-img.png"
          alt="error-img"
          className="rounded-md w-60 h-60"
        />
        <h2 className="text-xl font-semibold">Internal Server Error</h2>
        <GeneralButton
          label="Logout"
          variant="contained"
          className="!bg-sky-500"
          handleOnClick={handleClickButton}
        />
      </div>
    </RawDialog>
  );
}
