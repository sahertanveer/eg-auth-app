import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignupForm from '../components/app/signup/form';
import { signup } from '../redux/actions/auth';

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useSelector(
    (state: any) => state.auth,
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated]);

  const handleSubmit = (values: {
    email: string;
    name: string;
    password: string;
  }) => {
    dispatch(signup(values) as any)
      .then((result: any) => {
        if (result.payload) {
          navigate('/dashboard');
        }
      })
      .catch((error: any) => {
        console.error('Signup error:', error);
      });
  };

  return (
    <div className="auth_form">
      <h1>Signup</h1>
      {/* {error && <div className="error">{error}</div>} */}
      <SignupForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default Signup;
