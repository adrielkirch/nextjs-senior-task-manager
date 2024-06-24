export class LoginResponseDto {
  constructor(public id: string, public token: string) { }
}

export class CreateRequestTeamDto {

  constructor(
    public name: string,
    public userId: string,

  ) {
    this.name = name;
    this.userId = userId;
  }
}


export class InviteRequestTeamDto {

  constructor(
    public email: string,
    public userId: string,
    public teamId: string,
    public role: string


  ) {
    this.userId = userId;
    this.teamId = teamId;
    this.email = email;
    this.role = role;
  }

}
