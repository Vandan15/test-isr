'use client';
import { AppContext } from '@/AppContext';
import { ROUTES, TOKEN } from '@/common/constants';
import { useLazyQuery } from '@apollo/client';
import { redirect as navigate } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import Login from '../component/auth/Login';
import { CURRENT_USER } from '../component/graphql/queries';

const useAuth = (WrappedComponent, { redirect }) => {
  const AuthenticatedComponent = (props) => {
    const [isAuth, setIsAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    const {
      state: { user },
      dispatch,
    } = useContext(AppContext);
    const [fetchUser, { loading: userLoading }] = useLazyQuery(CURRENT_USER, {
      onCompleted: ({ getCurrentUser }) => {
        dispatch({ type: 'SET_CURRENT_USER', data: getCurrentUser });
      },
      fetchPolicy: 'network-only',
      onError() {},
    });

    useEffect(() => {
      const authToken = localStorage?.getItem(TOKEN);
      console.log(authToken);
      if (authToken) {
        setIsAuth(true);
        if (!user) {
          //fetch user details
          fetchUser();
        }
      }
      setLoading(false);
    }, [user]);

    if (loading || userLoading) {
      return 'Loading...';
    } else {
      if (isAuth) {
        if (redirect) {
          navigate(ROUTES?.HOME);
        } else {
          return <WrappedComponent {...props} />;
        }
      } else {
        return <Login />;
      }
    }
  };

  return AuthenticatedComponent;
};

export default useAuth;
