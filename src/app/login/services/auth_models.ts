export class UserPasswordRequest {
  public grant_type: string;
  username: string;
  password: string;
  client_id: string;
}

  export class obtenerTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  server_time: string;
}
