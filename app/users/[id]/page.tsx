"use client";
import BreadcrumbsCustom from "@/components/molecules/Breadcrumbs";
import CardUser from "@/components/molecules/CardUser";
import { validateLogin } from "@/helper";
import { IDataBreadcrumbs, IUserData } from "@/services/data-types";
import { getUserById } from "@/services/reqResServices";
import { Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

const initCard = ({ avatar, email, first_name, last_name }: IUserData) => (
  <>
    <CardUser
      avatar={avatar}
      email={email}
      name={`${first_name || ''} ${last_name || ''}`}
    />
  </>
);

const initSkeletonCard = () => {
  return <Skeleton variant="rounded" width={250} height={290} />;
};

export default function UserDetail({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataUsers, setDataUsers] = useState<IUserData>({} as IUserData);

  const breadcrumbData: IDataBreadcrumbs[] = [
    { name: "Users", isActive: false, path: "/users" },
    { name: "Detail", isActive: true, path: `/users/${params.id}` },
  ];

  const getUserByDataId = useCallback(async () => {
    try {
      const response = await getUserById(Number(params.id));
      const respData = response.data?.data;
      setDataUsers((prev) => ({
        ...prev,
        ...respData,
      }));
      setIsLoading(false);
    } catch (err) {
      console.log("error", err);
    }
  }, [dataUsers]);

  useEffect(() => {
    const dataToken = validateLogin();
    if (dataToken) {
      getUserByDataId();
    }
  }, []);

  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <BreadcrumbsCustom arrData={breadcrumbData} />
      <div className="py-4 h-full flex-grow flex justify-center">
        {!isLoading && initCard(dataUsers)}
        {isLoading && initSkeletonCard()}
      </div>
    </div>
  );
}
