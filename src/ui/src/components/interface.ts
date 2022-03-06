export interface Config {
  api_address: string;
}

export interface LoginCredential {
  username: string,
  password: string
}

export interface SignUpCredential {
  firstname: string,
  lastname: string,
  email_id: string,
  username: string,
  password: string
}

export interface TokenResponse {
  token: string | null
}

export interface UserInfo {
  firstname: string,
  lastname: string,
  username: string,
  email_id: string
}

export interface Blog {
  blog_id: number,
  blog_content: string
}

