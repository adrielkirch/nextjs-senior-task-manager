import ApiClient from "../httpClient";
import apiConstants from "../../constants/api.constants";
import { ProfileResponseDto } from "src/adapters/response/profile.response.dto";


const me = async () => {
  const apiClient = ApiClient.getInstance();

  try {
    const url = `${apiConstants.baseUrl}/profiles/me`;

    return await apiClient.get<ProfileResponseDto>(url);
  } catch (error) {
    console.error('Get me failed:', error);
  }
};

export default me;
