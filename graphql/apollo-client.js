'use client';

import { TOKEN } from '@/common/constants';
import { toastError, toastSuccess } from '@/common/toast';
import { ApolloLink, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { isObject } from 'lodash';

const responseMessageLink = new ApolloLink((operation, forward) =>
  forward(operation)?.map((response) => {
    const { data } = response;
    if (
      data &&
      isObject(data) &&
      Object?.keys(data)?.length > 0 &&
      data?.[`${Object?.keys(data)?.[0]}`]?.message
    ) {
      if (Object?.keys(data)?.[0] === 'forgotUserPassword') {
        if (data?.[`${Object?.keys(data)?.[0]}`]?.status !== 'ERROR') {
          setTimeout(() => {
            toastSuccess(
              data?.[`${Object?.keys(data)?.[0]}`]?.message ||
                'Operation successful',
            );
          }, 1000);
        }
      } else {
        setTimeout(() => {
          const oResponse = data?.[`${Object?.keys(data)?.[0]}`];

          if (!response) {
            return;
          }

          if (oResponse?.status === 'ERROR') {
            toastError(oResponse?.message);
          } else {
            toastSuccess('Operation successful');
          }
        }, 1000);
      }
    }
    return response;
  }),
);

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (networkError?.statusCode === 405) {
      if (disableToastTimeout) {
        clearTimeout(disableToastTimeout);
      }

      disableToastTimeout = setTimeout(() => {
        if (networkError?.result?.message) {
          toastError(networkError?.result?.message);
        }
      }, 200);

      Router?.replace(ROUTES?.LOGOUT);
      return;
    }

    if (graphQLErrors?.length > 0) {
      const isForBidden = graphQLErrors?.[0]?.extensions?.code === 'FORBIDDEN';

      if (!isForBidden) {
        setTimeout(() => {
          toastError(graphQLErrors?.[0]?.message);
        }, 1000);
      }
    } else {
      setTimeout(() => {
        toastError('Something went wrong!');
      }, 1000);
    }

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        const { message: errorMessage, locations, path, extensions } = err;

        // Sentry?.captureException(
        //   new Error(
        //     `[Response error]: Message: ${errorMessage}, Location: ${locations}, Path: ${path}`,
        //   ),
        // );

        let forward$;
        switch (extensions?.code) {
          case 'SESSION_EXPIRED':
            if (!isRefreshing) {
              isRefreshing = true;
              forward$ = fromPromise(
                getSession()
                  .then((session) => {
                    cachedToken = session?.accessToken;
                    return true;
                  })
                  .then(() => {
                    resolvePendingRequests();
                    return true;
                  })
                  .catch(() => {
                    pendingRequests = [];
                    return false;
                  })
                  .finally(() => {
                    isRefreshing = false;
                  }),
              );
            } else {
              forward$ = fromPromise(
                // eslint-disable-next-line no-undef
                new Promise((resolve) => {
                  pendingRequests.push(() => resolve());
                }),
              );
            }

            return forward$.flatMap(() => forward(operation));

          case 'UNAUTHENTICATED':
            Router?.replace(ROUTES?.LOGOUT);
            break;

          default:
            // eslint-disable-next-line no-console
            console.log(
              `[Response error]: Message: ${errorMessage}, Location: ${locations}, Path: ${path}`,
            );
        }
      }
    }

    if (networkError) {
      // eslint-disable-next-line no-console
      console?.log(`[Network error]: ${networkError}`);
      Sentry?.captureException(new Error(`[Network error]: ${networkError}`));
    }
  },
);

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const accessToken = localStorage?.getItem(TOKEN);
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const makeClient = () => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : from([responseMessageLink, errorLink, authLink, httpLink]),
  });
};

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
