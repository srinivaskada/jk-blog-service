export type BlogId = number
export type UserId = number
export enum SocialAccountType {
  Google = 'google',
  Facebook = 'facebook'
}

export type JwtPayloadUser = {
  sub: number;
  id: number;
  email: string;
};