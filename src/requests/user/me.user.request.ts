import ApiClient from "../httpClient";
import apiConstants from "../../constants/api.constants";
import { UserResponseDto } from "src/adapters/response/user.response.dto";

const me = async () => {
  const apiClient = ApiClient.getInstance();

  try {
    const url = `${apiConstants.baseUrl}/users/me`;

    return await apiClient.get<UserResponseDto>(url);
  } catch (error) {
    console.error('Get me failed:', error);
  }
};

export default me;
