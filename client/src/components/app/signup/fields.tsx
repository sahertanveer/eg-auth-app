export const inputFields = [
  {
    name: 'name',
    label: 'Name',
    rules: [
      { required: true, message: 'Please enter your name' },
      { min: 3, message: 'Name must be at least 3 characters' },
      { max: 50, message: 'Name must not exceed 50 characters' },
    ],
  },
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
    rules: [
      { required: true, message: 'Please enter your password' },
      { min: 8, message: 'Password must be at least 8 characters' },
      {
        pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
        message:
          'Password must contain at least 1 letter, 1 number, and 1 special character',
      },
    ],
  },
];
