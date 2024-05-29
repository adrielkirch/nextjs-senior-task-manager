import ApiClient from "../httpClient";
import apiConstants from "../../constants/api.constants";
import { CreateRequestTeamDto } from "src/adapters/request/team.request.dto";
import { TeamResponseDto } from "src/adapters/response/team.response.dto";


const create = async (payload: CreateRequestTeamDto) => {
  const apiClient = ApiClient.getInstance();

  try {
    return await apiClient.post<TeamResponseDto>(`${apiConstants.baseUrl}/teams/create`, payload);
  } catch (error) {
    console.error('Register failed:', error);
    throw error;
  }
};

export default create;
