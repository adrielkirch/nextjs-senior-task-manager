import ApiClient from "../httpClient";
import apiConstants from "../../constants/api.constants";
import { UserResponseDto } from "src/adapters/response/user.response.dto";
import { UpdateRequestUserDto } from "src/adapters/request/user.request.dto";

const update = async (payload: UpdateRequestUserDto) => {
  const apiClient = ApiClient.getInstance();

  try {
    const url = `${apiConstants.baseUrl}/users/`;

    return await apiClient.put<UserResponseDto>(url,payload);
  } catch (error) {
    throw error;
  }
};

export default update;
