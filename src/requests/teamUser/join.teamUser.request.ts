import ApiClient from "../httpClient";
import apiConstants from "../../constants/api.constants";
import { CreateRequestTeamDto } from "src/adapters/request/team.request.dto";
import { TeamResponseDto } from "src/adapters/response/team.response.dto";


const join = async (payload: CreateRequestTeamDto) => {
  const apiClient = ApiClient.getInstance();

  try {
    return await apiClient.post<TeamResponseDto>(`${apiConstants.baseUrl}/teams/join`, payload);
  } catch (error) {
    throw error;
  }
};

export default join;
