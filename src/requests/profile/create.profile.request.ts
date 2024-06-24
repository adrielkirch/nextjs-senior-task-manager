import ApiClient from "../httpClient";
import apiConstants from "../../constants/api.constants";
import { UserResponseDto } from "src/adapters/response/user.response.dto";
import { CreateProfileRequestDto } from "src/adapters/request/profile.request.dto";

const create = async (payload: CreateProfileRequestDto) => {
  const apiClient = ApiClient.getInstance();

  try {
    return await apiClient.post<UserResponseDto>(`${apiConstants.baseUrl}/profiles/create`, payload);
  } catch (error) {
    console.error('Register failed:', error);
    throw error;
  }
};

export default create;
