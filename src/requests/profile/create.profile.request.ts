import ApiClient from "../httpClient";
import apiConstants from "../../constants/api.constants";
import { UserResponseDto } from "src/adapters/response/user.response.dto";
import { ProfileResponseDto } from "src/adapters/response/profile.response.dto";

const create = async (payload: ProfileResponseDto) => {
  const apiClient = ApiClient.getInstance();

  try {
    return await apiClient.post<UserResponseDto>(`${apiConstants.baseUrl}/profiles/create`, payload);
  } catch (error) {
    console.error('Register failed:', error);
    throw error;
  }
};

export default create;
