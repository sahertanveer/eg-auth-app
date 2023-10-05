import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/global/button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/auth';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout() as any)
      .then((result: any) => {
        if (result.type === 'auth/logout/fulfilled') {
          navigate('/');
        }
      })
      .catch((error: any) => {
        console.error('Logout error:', error);
      });
  };
  return (
    <div className="auth_form">
      <h1>Welcome to Dashboard!</h1>
      <br />
      <center>
        <CustomButton
          type="primary"
          htmlType="submit"
          className="btn btn-primary"
          onClick={() => handleLogout()}
        >
          Logout
        </CustomButton>
      </center>
    </div>
  );
};

export default Dashboard;
