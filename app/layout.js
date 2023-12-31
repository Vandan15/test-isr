import { AppContextProvider } from '@/AppContext';
import { ApolloWrapper } from '@/graphql/apollo-client';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import MaintenancePage from './component/common/MaintenancePage';
import Header from './component/navs/Header';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
// use this variable from envs so that we can able to run maintenance page on runtime.
const maintenance = process.env.MAINTENANCE_ENABLE;

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {maintenance === 'true' ? (
          <MaintenancePage />
        ) : (
          <AppContextProvider>
            <Toaster />
            <ApolloWrapper>
              <Header />
              {children}
            </ApolloWrapper>
          </AppContextProvider>
        )}
      </body>
    </html>
  );
}
export default RootLayout;
