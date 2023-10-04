"use client";
import BreadcrumbsCustom from "@/components/molecules/Breadcrumbs";
import CardUser from "@/components/molecules/CardUser";
import { validateLogin } from "@/helper";
import { IDataBreadcrumbs, IUserData } from "@/services/data-types";
import { getAllUsers } from "@/services/reqResServices";
import { CircularProgress, Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

const initCard = (data: IUserData[], handleClickCard: (id: number) => void) => (
  <>
    {data &&
      data.map(({ avatar, email, first_name, last_name, id }: IUserData, index) => (
        index === data.length - 1 ?
        <div className="mb-16 md:mb-0" key={id}>
          <CardUser
          avatar={avatar}
          email={email}
          name={`${first_name || ' - '} ${last_name  || ''}`}
          handleClick={() => handleClickCard(id)}
          withButton
        />
        </div>
        :
        <CardUser
          key={id}
          avatar={avatar}
          email={email}
          name={`${first_name || ' - '} ${last_name  || ''}`}
          handleClick={() => handleClickCard(id)}
          withButton
        />
      ))}
  </>
);

const initSkeletonCard = (count: number) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} variant="rounded" width={250} height={290} />
      ))}
    </>
  );
};

const breadcrumbData: IDataBreadcrumbs[] = [
  { name: "Users", isActive: true, path: "/users" },
];

export default function Users() {
  const [configPagination, setConfigPagination] = useState({
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  });
  const [dataUsers, setDataUsers] = useState<IUserData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const divRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleClickCard = useCallback(
    (id: number) => {
      router.push(`/users/${id}`);
    },
    [router]
  );

  const handleGetDataUsers = useCallback(
    async (paramPage?: number) => {
      const { page, per_page } = configPagination;
      const param = {
        page: paramPage ? paramPage : page,
        per_page,
      };
      try {
        const response = await getAllUsers(param);
        const { data } = response;
        setConfigPagination((prev) => ({
          ...prev,
          page: data?.page || 1,
          per_page: data?.per_page || 10,
          total: data?.total || 0,
          total_pages: data?.total_pages || 0,
        }));

        const respData = data?.data;
        if (param.page !== 1) {
          if (configPagination.page !== data?.page) {
            setDataUsers((prev) => [...prev, ...respData]);
          }
        } else {
          setDataUsers(() => [...respData]);
        }

        if (respData.length === 0) {
          if (divRef.current) {
            const { scrollTop, clientHeight } = divRef.current;
            divRef.current.scrollTop = scrollTop - (clientHeight / 20);
          }
        }
        setIsLoading(false);
      } catch (err) {
        console.log("error", err);
      }
    },
    [configPagination]
  );

  useEffect(() => {
    const dataToken = validateLogin();
    if (dataToken) {
      handleGetDataUsers();
    }
  }, []);

  const checkScrollbarPosition = useCallback(() => {
    if (divRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = divRef.current;
      const statusBar = scrollTop >= scrollHeight - clientHeight;
      if (statusBar && !isFetching) {
        setIsFetching(true)
        setIsFetching(true);
        handleGetDataUsers(configPagination.page + 1).then(() => {
          setIsFetching(false)
        })
      }
    }
  }, [isFetching, configPagination, handleGetDataUsers]);

  useEffect(() => {
    if (divRef.current) {
      checkScrollbarPosition();
      divRef.current.addEventListener("scroll", checkScrollbarPosition);
      return () => {
        divRef.current?.removeEventListener("scroll", checkScrollbarPosition);
      };
    }
  }, [checkScrollbarPosition]);

  return (
    <div className="relative h-full flex flex-col gap-4 p-4">
      <BreadcrumbsCustom arrData={breadcrumbData} />
      <div
        ref={divRef}
        className="pt-6 pb-6 md:pb-14 h-full overflow-y-auto grid grid-cols-1 grid-flow-row md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center wrapper-no-scrollbar"
      >
        {!isLoading && initCard(dataUsers, handleClickCard)}
        {isLoading && initSkeletonCard(10)}
        {isFetching && <div className="absolute bottom-0 left-1/2 -translate-x-1/2"><CircularProgress size={30} /></div>}
      </div>
    </div>
  );
}
