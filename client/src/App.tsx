import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { loadUser } from './redux/actions/auth';
import { RootState } from './redux/store';
import ProtectedRoute from './routes/ProtectedRoute';
import Signup from './views/Signup';
import Signin from './views/Signin';
import Dashboard from './views/Dashboard';
import Alert from './components/global/alert';

import 'antd/dist/reset.css';

const App: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    // Dispatch an action to load user data when the app is loaded
    dispatch<any>(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Alert />
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        
        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
