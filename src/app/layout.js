import './globals.css';
import AuthProvider from '@/components/custom/AuthProvider'

export const metadata = {
   title: 'Special Chaplain Peace Corps',
 }
 
 export default function RootLayout({ children }) {
   return (
     <html lang="en">
       <head />
       <body>
         <AuthProvider>
            {children}
         </AuthProvider>
       </body>
     </html>
   )
 }
 