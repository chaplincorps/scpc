'use client'

import { useMemo, useEffect } from 'react'
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
  School
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuthStore } from '@/store/authStore'
import { useLanguageStore } from '@/store/languageStore'
import { useTranslation } from '@/utils/translations'

const NavigationLogic = () => {
   const pathname = usePathname()
   const user = useAuthStore(state => state.user)
   const loading = useAuthStore(state => state.loading)
   const initialized = useAuthStore(state => state.initialized)
   const authInitialized = initialized && !loading
   const isAuthenticated = authInitialized && Boolean(user)
   const { currentLanguage: lang, languages, setLanguage } = useLanguageStore()
   const { translate, currentLanguage } = useTranslation()

   // Debug language changes
   useEffect(() => {
     console.log('NavigationLogic language:', currentLanguage, 'store language:', lang)
   }, [currentLanguage, lang])

   

   const chaplain = useMemo(() => ({
     name: 'SCPC',
     fullName: 'Special Chaplain Peace Corps',
     rights: 'All rights reserved, SCPC 2025',
   }), [])

   // Update chaplain rights with translation
   chaplain.rights = translate('common.copyright')

   const getCurrentLanguage = () => {
     return languages.find(lang => lang.code === currentLanguage)
   }
 
   const publicNavigationItems = useMemo(() => [
     { title: translate('navigation.onboarding'),      icon: Compass,           url: '/Client/Onboarding', id:'dashboard',       isActive: pathname === '/Client/Onboarding' },
     { title: translate('navigation.login'),           icon: UserRoundCheck,    url: '/Client/Login',      id:'login',           isActive: pathname === '/Client/Login' },
     { title: translate('navigation.register'),        icon: UserRoundPlus,     url: '/register',          id:'register',        isActive: pathname === '/register' },
     { title: translate('navigation.verifyEmail'),     icon: MailCheck,         url: '/verify-email',      id:'verify-email',    isActive: pathname === '/verify-email' },
     { title: translate('navigation.resetPassword'),   icon: ShieldCheck,       url: '/reset-password',    id:'reset-password',  isActive: pathname === '/reset-password' },
     { title: translate('navigation.gallery'),         icon: Image,             url: '/gallery',           id:'gallery',         isActive: pathname === '/gallery' },
     { title: translate('navigation.events'),          icon: Calendar,          url: '/events',            id:'events',          isActive: pathname === '/events' },
     { title: translate('navigation.about'),           icon: Library,           url: '/about',             id:'about',           isActive: pathname === '/about' },
     { title: translate('navigation.support'),         icon: Headset,           url: '/support',           id:'support',         isActive: pathname === '/support' },
     { title: translate('navigation.terms'),           icon: Handshake,         url: '/terms',             id:'terms',           isActive: pathname === '/terms' },
     { title: translate('navigation.policy'),          icon: GlobeLock,         url: '/policy',            id:'policy',          isActive: pathname === '/policy' },
   ], [pathname, translate, currentLanguage])
 
   const authenticatedNavigationItems = useMemo(() => [
     { title: translate('navigation.dashboard'),        icon: LayoutDashboard,  url: '/client/dashboard', id:'client-dashboard',    isActive: pathname === '/client/dashboard' },
     { title: translate('navigation.cbtExam'),         icon: BookOpenCheck,    url: '/client/cbt-exam', id:'cbt-exam',     isActive: pathname === '/client/cbt-exam' },
     { title: translate('navigation.cbtResults'),      icon: Scroll,            url: '/client/cbt-results',id:'/cbt-results',   isActive: pathname === '/client/cbt-results' },
     { title: translate('navigation.applicationForm'), icon: FileText,         url: '/client/application',id:'application',   isActive: pathname === '/client/application' },
     { title: translate('navigation.learn'), icon: School,         url: '/client/learn', id:'learn',   isActive: pathname === '/client/learn' },
   ], [pathname, translate, currentLanguage])
 
   const dropdownItems = useMemo(() => [
     { title: translate('navigation.profile'),   icon: User,     url: '/client/profile' },
     { title: translate('navigation.settings'),  icon: Settings, url: '/client/settings' },
     { title: translate('navigation.support'),   icon: Headset,  url: '/client/support' },
     { title: translate('navigation.logout'),    icon: LogOut,   url: '/logout' },
   ], [translate, currentLanguage])

   const languageDropdownItems = useMemo(() => languages.map(lang => ({
     title: lang.name,
     icon: () => <span className="text-lg">{lang.flag}</span>,
     onClick: () => {
       console.log('Setting language to:', lang.code)
       setLanguage(lang.code)
     }
   })), [languages, setLanguage])
 
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
         <div className="flex items-center mb-2">
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
       return <Skeleton className="h-6 w-24 rounded" />
     }
     const items = isAuthenticated ? authenticatedNavigationItems :publicNavigationItems
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
     languageDropdownItems,
     currentLanguage: getCurrentLanguage(),
   }
}

export default NavigationLogic