export class LoginResponseDto {
  constructor(public id: string, public token: string) {}
}

export class UserResponseDto {
  constructor(
    public id: string,
    public name: string,
    public surname: string,
    public email: string,
    public createdAt: Date,
    public updatedAt: Date,
    public role: string,
    public phone: string
  ) {}
}
