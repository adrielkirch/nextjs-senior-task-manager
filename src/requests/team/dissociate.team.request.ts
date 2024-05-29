import ApiClient from "../httpClient";
import apiConstants from "../../constants/api.constants";
import { TeamResponseDto } from "src/adapters/response/team.response.dto";
import { DissociateRequestUserFromTeamDto } from "src/adapters/request/teamUser.request.dto";


const dissociate = async (payload: DissociateRequestUserFromTeamDto) => {
  const apiClient = ApiClient.getInstance();

  try {
    return await apiClient.post<TeamResponseDto>(`${apiConstants.baseUrl}/teams/dissociate`, payload);
  } catch (error) {
    console.error('Register failed:', error);
    throw error;
  }
};

export default dissociate;
