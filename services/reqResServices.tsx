import apiService from "@/config/api/apiService";
import { processErrorResponse, processResponseData } from "@/config/api/responseApi";
import { IAuthLogin, IUserRegister } from "./data-types";

const baseURL = process.env.NEXT_PUBLIC_URL_API_MOCK

export async function authLogin(body: IAuthLogin) {
    try {
      const response = await apiService.post('/login', body, {baseURL});
      return processResponseData(response);
    } catch (error) {
      return processErrorResponse(error);
    }
  }
  
export async function userRegister(body: IUserRegister) {
    try {
      const response = await apiService.post('/register', body, {baseURL});
      return processResponseData(response);
    } catch (error) {
      return processErrorResponse(error);
    }
  }

export async function userLogout() {
    try {
      const response = await apiService.post('/logout', {baseURL});
      return processResponseData(response);
    } catch (error) {
      return processErrorResponse(error);
    }
  }

export async function getAllUsers(params: object) {
    try {
      const response = await apiService.get('/users', {baseURL, params});
      return processResponseData(response);
    } catch (error) {
      return processErrorResponse(error);
    }
  }

export async function getUserById(id: number) {
    try {
      const response = await apiService.get(`/users/${id}`, {baseURL});
      return processResponseData(response);
    } catch (error) {
      return processErrorResponse(error);
    }
  }
  
