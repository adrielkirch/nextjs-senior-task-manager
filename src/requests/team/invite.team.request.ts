import ApiClient from "../httpClient";
import apiConstants from "../../constants/api.constants";
import { InviteRequestTeamDto } from "src/adapters/request/team.request.dto";
import { TeamResponseDto } from "src/adapters/response/team.response.dto";


const invite = async (payload: InviteRequestTeamDto) => {
  const apiClient = ApiClient.getInstance();

  try {
    return await apiClient.post<TeamResponseDto>(`${apiConstants.baseUrl}/teams/invite`, payload);
  } catch (error) {
    throw error;
  }
};

export default invite;
