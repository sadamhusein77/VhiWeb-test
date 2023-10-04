import * as React from "react";
import { Breadcrumbs, Link as LinkBreadcrumb } from "@mui/material";
import Link from "next/link";
import { IDataBreadcrumbs } from "@/services/data-types";

interface IPropsBreadcrumbs {
  arrData: IDataBreadcrumbs[];
}

export default function BreadcrumbsCustom({ arrData }: IPropsBreadcrumbs) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {arrData.map(({ name, path, isActive }: IDataBreadcrumbs, index) => (
        <Link href={path} key={index}>
            <span className={`${isActive ? 'text-sky-500 font-semibold' : 'font-thin'} hover:underline`}>{name}</span>
        </Link>
      ))}
    </Breadcrumbs>
  );
}
