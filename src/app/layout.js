import './globals.css';
import { getUserFromCookie } from '@/lib/auth'
import AuthProvider from '@/components/custom/AuthProvider'
import { Toaster } from 'react-hot-toast';
 
 export default async function RootLayout({ children }) {
   const { user, error } = await getUserFromCookie()
   return (
     <html lang="en">
       <head />
       <body>
       <AuthProvider initialUser={user} initialError={error}>
            <Toaster
               toastOptions={{
                  style: {
                     background: '#000000',
                     color: '#FFFFFF',
                     fontFamily: 'Inter, sans-serif',
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
 