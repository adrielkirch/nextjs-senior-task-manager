import ApiClient from "../httpClient";
import apiConstants from "../../constants/api.constants";
import { UpdateProfileRequestDto } from "src/adapters/request/profile.request.dto";
import { ProfileResponseDto } from "src/adapters/response/profile.response.dto";

const update = async (payload: UpdateProfileRequestDto) => {
  const apiClient = ApiClient.getInstance();

  try {
    const url = `${apiConstants.baseUrl}/profiles/`;

    return await apiClient.put<ProfileResponseDto>(url,payload);
  } catch (error) {
    throw error;
  }
};

export default update;
