
export class LoginRequestDto {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class CreateRequestUserDto {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  phone: string;

  constructor(name: string, surname: string, email: string, password: string, phone: string, role: string) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.role = role;
    this.phone = phone;
  }
}

export class UpdateRequestUserDto {
  id?: string;
  name?: string;
  surname?: string;
  role?: string;
  password?: string;
  phone?: string;

  constructor(id: string, name?: string, surname?: string, role?: string, password?: string, phone?: string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.role = role || 'guest';
    this.password = password;
    this.phone = phone;
  }
}
