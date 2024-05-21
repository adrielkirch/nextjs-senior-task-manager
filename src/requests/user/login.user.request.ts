import ApiClient from "../httpClient";
import apiConstants from "../../constants/api.constants";

const login = async (email: string, password: string) => {
  const apiClient = ApiClient.getInstance();
  console.log(email,' ',password);
  try {
    const url = `${apiConstants.baseUrl}/users/login`;
    const response = await apiClient.post<any>(url, { email, password });
    console.log(response.data)
    alert(response.data.token)
    localStorage.setItem('token', response.data.token);

    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export default login;
