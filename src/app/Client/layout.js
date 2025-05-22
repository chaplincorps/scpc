'use client'

import NavigationView from '@client/Navigation/NavigationView';

export default function ClientRootLayout({ children }) {

  return (
   <NavigationView>
     {children}
   </NavigationView>
  )
}
