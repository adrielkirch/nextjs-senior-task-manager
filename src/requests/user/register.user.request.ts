import ApiClient from "../httpClient";
import apiConstants from "../../constants/api.constants";
import { CreateRequestUserDto } from "src/adapters/request/user.request.dto";
import { UserResponseDto } from "src/adapters/response/user.response.dto";

const register = async (payload: CreateRequestUserDto) => {
  const apiClient = ApiClient.getInstance();

  try {
    return await apiClient.post<UserResponseDto>(`${apiConstants.baseUrl}/users/signup`, payload);
  } catch (error) {
    console.error('Register failed:', error);
    throw error;
  }
};

export default register;
