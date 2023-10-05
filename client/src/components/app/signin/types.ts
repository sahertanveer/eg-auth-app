export interface FormData {
  email: string;
  password: string;
}

export interface SigninFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
}
