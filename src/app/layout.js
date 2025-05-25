import './globals.css';
import { Inter } from 'next/font/google'
import { getUserFromCookie } from '@/lib/auth'
import AuthProvider from '@/components/custom/AuthProvider'
import { Toaster } from 'react-hot-toast';

 const inter = Inter({
   subsets: ['latin'],
   variable: '--font-inter', 
})
 
 export default async function RootLayout({ children }) {
   const { user, error } = await getUserFromCookie()

   return (
     <html lang="en" className={inter.variable}>
       <head />
       <body>
       <AuthProvider initialUser={user} initialError={error}>
            <Toaster
               toastOptions={{
                  style: {
                     background: '#000000',
                     color: '#FFFFFF',
                     fontFamily: 'sans-serif',
                     fontSize: '12px',
                  },
                  duration: 5000,
                  position: 'top-right',
               }}
            />
            {children}
         </AuthProvider>
       </body>
     </html>
   )
 }
 