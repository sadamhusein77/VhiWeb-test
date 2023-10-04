import React from "react";
import GeneralButton from "@/components/atoms/button";

interface ICardProps {
  avatar?: string;
  name?: string;
  email?: string;
  handleClick?: () => void;
  withButton?: boolean;
}
const defaultAvatar = process.env.NEXT_PUBLIC_DEFAULT_USER_IMG;
export default function CardUser({
  avatar = defaultAvatar,
  name,
  email ,
  handleClick = () => console.log("clicked"),
  withButton
}: ICardProps) {
  return (
    <div
      className="bg-white shadow-md text-center p-4 rounded-lg flex flex-col justify-center items-center gap-2 w-[250px] h-auto border border-slate-500/25 hover:shadow-xl"
    >
      <img
        src={avatar}
        alt="img-card"
        className="rounded-full object-cover object-center overflow-hidden w-[150px] h-[150px]"
      />
      <h3 className="text-md font-bold text-slate-600 break-all">{email || ' - '}</h3>
      <h3 className="text-base font-semibold text-slate-400 overflow-hidden overflow-ellipsis whitespace-normal">{name || ' - '}</h3>
      {
        withButton && 
        <GeneralButton label="Detail" handleOnClick={handleClick} variant="text" size="small" className="!text-sky-500" />
      }
    </div>
  );
}
