export interface IMessage {
  user_type: UserType;
  message: string;
  send_date: Date;
}

export enum UserType {
  USER = "User",
  BOT = "Bot",
}

export interface ISendMessage {
  role: string;
  message: string;
}

export interface IMemberMessage {
  user_type: UserType;
  message: string;
  nickname: string;
  send_date: Date;
}