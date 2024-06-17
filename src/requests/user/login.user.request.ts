import ApiClient from "../httpClient";
import apiConstants from "../../constants/api.constants";
import { LoginRequestDto } from "src/adapters/request/user.request.dto";
import { LoginResponseDto } from "src/adapters/response/user.response.dto";

const login = async (payload: LoginRequestDto) => {
  const apiClient = ApiClient.getInstance();

  try {
    const url = `${apiConstants.baseUrl}/users/login`;

    return await apiClient.post<LoginResponseDto>(url, payload);
  } catch (error) {
    throw error;
  }
};

export default login;
