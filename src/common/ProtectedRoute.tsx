import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router';


const ProtectedRoute: React.FC<RouteProps> = ({ ...props }) => {

  const auth = useSelector((state: RootState) => state.auth);
  return (
    auth.isAuthenticated
      ? <Route {...props} />
      : <Redirect to='/about'/>
  )
};

export default ProtectedRoute;
