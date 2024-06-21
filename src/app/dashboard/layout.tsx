'use client';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import NavBar from '../components/NavBar';
import { UserService } from '../integration/cefet-material-archive/user/user.service';
import { useAuthedQuery } from '../hooks/useAuthedQuery.hook';

const inter = Inter({ subsets: ['latin'] });

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const userService = new UserService();
  const { data: userData } = useAuthedQuery(
    'user',
    () => userService.getCurrentUser(),
    {
      enabled: true,
    }
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar userName={userData?.data.displayName ?? ''} />
        {children}
      </body>
    </html>
  );
}
