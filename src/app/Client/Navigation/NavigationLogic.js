'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import {
  Compass,
  UserRoundCheck,
  UserRoundPlus,
  MailCheck,
  ShieldCheck,
  Handshake,
  GlobeLock,
  Headset,
  LayoutDashboard,
  Settings,
  User,
  LogOut,
  Image,
  Calendar,
  BookOpenCheck,
  Library,
  Scroll,
  FileText,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuthStore } from '@/store/authStore'

const NavigationLogic = () => {
   const pathname = usePathname()
   const user    = useAuthStore(state => state.user)
   const loading = useAuthStore(state => state.loading)

 
   const isAuthenticated = Boolean(user)
   const authInitialized = !loading
 
   const chaplain = useMemo(() => ({
     name: 'SCPC',
     fullName:'Special Chaplain Peace Corps',
     rights: 'All rights reserved, SCPC 2025',
   }), [])
 
   const publicNavigationItems = useMemo(() => [
     { title: 'Onboarding',      icon: Compass,           url: '/onboarding',          isActive: pathname === '/onboarding' },
     { title: 'Login',           icon: UserRoundCheck,    url: '/login',               isActive: pathname === '/login' },
     { title: 'Register',        icon: UserRoundPlus,     url: '/register',            isActive: pathname === '/register' },
     { title: 'Verify Email',    icon: MailCheck,         url: '/verify-email',        isActive: pathname === '/verify-email' },
     { title: 'Reset Password',  icon: ShieldCheck,       url: '/reset-password',      isActive: pathname === '/reset-password' },
     { title: 'Gallery',         icon: Image,             url: '/gallery',             isActive: pathname === '/gallery' },
     { title: 'Events',          icon: Calendar,          url: '/events',              isActive: pathname === '/events' },
     { title: 'About',           icon: Library,           url: '/about',               isActive: pathname === '/about' },
     { title: 'Support',         icon: Headset,           url: '/support',             isActive: pathname === '/support' },
     { title: 'Terms',           icon: Handshake,         url: '/terms',               isActive: pathname === '/terms' },
     { title: 'Policy',          icon: GlobeLock,         url: '/policy',              isActive: pathname === '/policy' },
   ], [pathname])
 
   const authenticatedNavigationItems = useMemo(() => [
     { title: 'Dashboard',        icon: LayoutDashboard,  url: '/client/dashboard',    isActive: pathname === '/client/dashboard' },
     { title: 'CBT Exam',         icon: BookOpenCheck,    url: '/client/cbt-exam',      isActive: pathname === '/client/cbt-exam' },
     { title: 'CBT Results',      icon: Scroll,            url: '/client/cbt-results',   isActive: pathname === '/client/cbt-results' },
     { title: 'Application Form', icon: FileText,         url: '/client/application',   isActive: pathname === '/client/application' },
   ], [pathname])
 
   const dropdownItems = useMemo(() => [
     { title: 'Profile',   icon: User,     url: '/client/profile' },
     { title: 'Settings',  icon: Settings, url: '/client/settings' },
     { title: 'Support',   icon: Headset,  url: '/client/support' },
     { title: 'Logout',    icon: LogOut,   url: '/logout' },
   ], [])
 
   // Skeleton helpers
   const getSkeletonNavigations = () => {
     const count = isAuthenticated
       ? authenticatedNavigationItems.length
       : publicNavigationItems.length
     return Array(count).fill(null).map((_, i) => ({
       id: `skeleton-nav-${i}`,
       isSkeleton: true,
       title: '',
       icon: () => (
         <div className="flex items-center mb-3">
           <Skeleton className="h-6 w-6 rounded-full" />
           <Skeleton className="ml-2 h-6 w-48 rounded" />
         </div>
       )
     }))
   }
 
   const getSkeletonDropdownItems = () =>
     dropdownItems.map((_, i) => ({
       id: `skeleton-dd-${i}`,
       isSkeleton: true,
       icon: () => (
         <div className="flex items-center mb-2">
           <Skeleton className="h-4 w-4 rounded" />
           <Skeleton className="ml-2 h-4 w-20" />
         </div>
       )
     }))
 
   // Choose nav list or skeleton
   const navigationItems = !authInitialized
     ? getSkeletonNavigations()
     : (isAuthenticated ? authenticatedNavigationItems : publicNavigationItems)
 
   // Get current page title
   function getCurrentPageTitle() {
     if (!authInitialized) {
       return <Skeleton className="h-6 w-24" />
     }
     const items = isAuthenticated ? authenticatedNavigationItems : publicNavigationItems
     const active = items.find(i => i.isActive)
     return active ? active.title : chaplain.name
   }
 
   return {
     navigationItems,
     getCurrentPageTitle,
     dropdownItems,
     getSkeletonDropdownItems,
     isAuthenticated,
     authInitialized,
     chaplain,
   }

}

export default NavigationLogic;