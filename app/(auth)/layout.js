'use client';

import useAuth from '../hooks/useAuth';
function AuthLayout({ children }) {
  return children;
}
export default useAuth(AuthLayout, { redirect: true });
