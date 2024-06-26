import ApiClient from "../httpClient";
import apiConstants from "../../constants/api.constants";
import { JoinRequestTeamDto } from "src/adapters/request/teamUser.request.dto";
import { TeamUserResponseDto } from "src/adapters/response/teamUser.response.dto";


const join = async (payload: JoinRequestTeamDto) => {
  const apiClient = ApiClient.getInstance();

  try {
    return await apiClient.post<TeamUserResponseDto>(`${apiConstants.baseUrl}/teams/join`, payload);
  } catch (error) {
    throw error;
  }
};

export default join;
