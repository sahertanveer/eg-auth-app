import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SigninForm from '../components/app/signin/form';
import { signin } from '../redux/actions/auth';

const Signin: React.FC = () => {
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

  const handleSubmit = (values: { email: string; password: string }) => {
    dispatch(signin(values) as any)
      .then((result: any) => {
        if (result.payload) {
          return navigate('/dashboard');
        }
      })
      .catch((error: any) => {
        console.error('Signin error:', error);
      });
  };

  return (
    <div className="auth_form">
      <h1>Signin</h1>
      {/* {error && <div className="error">{error}</div>} */}
      <SigninForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default Signin;
