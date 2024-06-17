export class CreateProfileRequestDto {
  notifications: string[];
  gender: string;
  image: string;
  userId: string;
  biography: string;

  constructor(notifications: string[] = [], gender: string, image: string, userId: string, biography: string) {
    this.notifications = notifications;
    this.gender = gender;
    this.image = image;
    this.userId = userId;
    this.biography = biography;
  }
}

export class UpdateProfileRequestDto {
  id: string;
  notifications?: string[];
  gender?: string;
  image?: string;
  userId?: string;
  biography?: string;

  constructor(id: string, notifications: string[], gender: string, image: string, userId: string, biography:string) {
    this.id = id;
    this.notifications = notifications;
    this.gender = gender;
    this.image = image;
    this.userId = userId;
    this.biography = biography;
  }
}
