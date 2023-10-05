export const inputFields = [
  {
    name: 'email',
    label: 'Email',
    rules: [
      { required: true, message: 'Please enter your email' },
      { type: 'email', message: 'Invalid email format' },
    ],
  },
  {
    name: 'password',
    label: 'Password',
    rules: [{ required: true, message: 'Please enter your password' }],
  },
];
