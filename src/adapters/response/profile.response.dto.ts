export class ProfileResponseDto {
  id: string;
  notifications: string[];
  gender: string;
  image: string;
  userId: string;
  biography:string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    notifications: string[],
    gender: string,
    image: string,
    userId: string,
    biography:string,
    createdAt: Date,
    updatedAt: Date

  ) {
    this.id = id;
    this.notifications = [];
    this.gender = gender;
    this.image = image;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.biography = biography;
  }
}
