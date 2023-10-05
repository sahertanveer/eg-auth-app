// Signup form data
export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

// Signin form data
export interface SigninFormData {
  email: string;
  password: string;
}

// User data
export interface IUser {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

// Authentication state
export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
  error: string | null;
}
