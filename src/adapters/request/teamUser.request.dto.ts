export class DissociateRequestUserFromTeamDto {
  constructor(
    public teamId: string,
    public userId: string,

  ) {
    this.teamId = teamId;
    this.userId = userId;
  }
}
