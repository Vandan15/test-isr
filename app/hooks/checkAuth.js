'use client';
import { AppContext } from '@/AppContext';
import { TOKEN } from '@/common/constants';
import { useLazyQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { CURRENT_USER } from '../component/graphql/queries';

const checkAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
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
      if (authToken) {
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
      return <WrappedComponent {...props} />;
    }
  };

  return AuthenticatedComponent;
};

export default checkAuth;
