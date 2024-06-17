import ApiClient from "../httpClient";
import apiConstants from "../../constants/api.constants";
import { UserResponseDto } from "src/adapters/response/user.response.dto";
import { UpdatePasswordRequestUserDto } from "src/adapters/request/user.request.dto";

const updatePassword = async (payload: UpdatePasswordRequestUserDto) => {
  const apiClient = ApiClient.getInstance();

  try {
    const url = `${apiConstants.baseUrl}/users/update-password`;

    return await apiClient.put<UserResponseDto>(url,payload);
  } catch (error) {
    throw error;
  }
};

export default updatePassword;
