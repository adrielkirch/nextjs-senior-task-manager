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
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.role = role;
    this.phone = phone;
  }
}
