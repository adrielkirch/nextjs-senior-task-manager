

export class TeamResponseDto {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(

    id: string,
    userId: string,
    createdAt: Date,
    updatedAt: Date,

  ) {
    this.id = id;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
