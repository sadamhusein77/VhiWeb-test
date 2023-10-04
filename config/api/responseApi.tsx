import { AxiosError, AxiosResponse } from "axios";

interface MyResponseData {
  status: number;
  message: string;
  data?: any;
  page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
}

interface MyErrorResponse {
  response: {
    data: {
      error?: string;
    };
    status: number;
  };
}

export async function processResponseData(response: AxiosResponse<MyResponseData>) {
  const {data, status} = response;
  return {
    status: status,
    message: data?.message || 'Success',
    data: data
  };
}

export async function processErrorResponse(error: AxiosError<MyErrorResponse> | any) {
  console.error("Error:", error);
  const { data, status } = error?.response

  return {
    status: status,
    message: data?.error ?? "An error occurred",
    data: null,
  };
}
