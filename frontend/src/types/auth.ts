export interface IJWTUserPayload {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: number;
}
