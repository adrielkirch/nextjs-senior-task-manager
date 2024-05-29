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
