import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export const revalidate = 10; // revalidate at most every 10s

function MoviesLayout({ children }) {
  return <>{children}</>;
}
export default MoviesLayout;
