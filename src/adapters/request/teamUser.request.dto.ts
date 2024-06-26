export class DissociateRequestUserFromTeamDto {
  constructor(
    public teamId: string,
    public userId: string,

  ) {
    this.teamId = teamId;
    this.userId = userId;
  }
}

export class JoinRequestTeamDto {
  constructor(
    public token: string,
    public userId: string,

  ) {
    this.token = token;
    this.userId = userId;
  }
}
