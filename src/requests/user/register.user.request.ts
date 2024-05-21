import ApiClient from "../httpClient";
import baseUrl from "../../constants/api.constants";

const register = async (email: string, password: string) => {
  const apiClient = ApiClient.getInstance();

  try {
    const response = await apiClient.post<any>(`${baseUrl}/users/signup`, { email, password });


    return response.data;
  } catch (error) {
    console.error('Register failed:', error);
  }
};

export default register;
