import './globals.css';
import AuthProvider from '@/components/custom/AuthProvider'
import { Toaster } from 'react-hot-toast';
 
 export default function RootLayout({ children }) {
   return (
     <html lang="en">
       <head />
       <body>
         <AuthProvider>
            <Toaster
               toastOptions={{
                  style: {
                     background: '#000000',
                     color: '#FFFFFF',
                     fontFamily: 'Inter400',
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
 