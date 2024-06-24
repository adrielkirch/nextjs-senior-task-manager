import ApiClient from "../httpClient";
import apiConstants from "../../constants/api.constants";
import { TeamResponseDto } from "src/adapters/response/team.response.dto";


const findMyTeam = async () => {
  const apiClient = ApiClient.getInstance();

  try {
    const url = `${apiConstants.baseUrl}/teams/mine`;

    return await apiClient.get<TeamResponseDto[]>(url);
  } catch (error) {
    if (error instanceof Error && (error as any).response && (error as any).response.data) {
      throw (error as any).response.data;
    }
    throw error;
  }
};

export default findMyTeam;
