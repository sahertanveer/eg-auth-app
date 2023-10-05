export interface FormData {
  name: string;
  email: string;
  password: string;
}

export interface SignupFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
}
