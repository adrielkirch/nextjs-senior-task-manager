import ApiClient from "../httpClient";
import apiConstants from "../../constants/api.constants";
import { TeamResponseDto } from "src/adapters/response/team.response.dto";


const findMyTeam = async () => {
  const apiClient = ApiClient.getInstance();

  try {
    const url = `${apiConstants.baseUrl}/team/user`;

    return await apiClient.get<TeamResponseDto>(url);
  } catch (error) {
    console.error('Get me failed:', error);
  }
};

export default findMyTeam;
