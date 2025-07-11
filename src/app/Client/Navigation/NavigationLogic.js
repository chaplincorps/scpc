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
  School,
  Layers,
  Gavel,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuthStore } from '@/store/authStore'
import { useLanguageStore } from '@/store/languageStore'
import { useTranslation } from '@/utils/translations'

export default function NavigationLogic() {
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
     { title: translate('navigation.onboarding'),      icon: Compass,           url: '/Client/Onboarding',    id:'dashboard',       isActive: pathname === '/Client/Onboarding'},
     { title: translate('navigation.login'),           icon: UserRoundCheck,    url: '/Client/Login',         id:'login',           isActive: pathname === '/Client/Login' },
     { title: translate('navigation.register'),        icon: UserRoundPlus,     url: '/Client/Registration',  id:'register',        isActive: pathname === '/Client/Registration'},
     { title: translate('navigation.verifyEmail'),     icon: MailCheck,         url: '/Client/Verify-Email',  id:'verify-email',    isActive: pathname === '/Client/Verify-Email'},
     { title: translate('navigation.resetPassword'),   icon: ShieldCheck,       url: '/Client/Reset-Password',id:'reset-password',  isActive: pathname === '/Client/Reset-Password'},
     { title: translate('navigation.department'),      icon: Layers,            url: '/Client/Department',    id:'Department',      isActive: pathname === '/Client/Department'},
     { title: translate('navigation.ethics'),          icon: Gavel ,            url: '/Client/Ethics',    id:'ethics',              isActive: pathname === '/Client/Ethics'},
     { title: translate('navigation.gallery'),         icon: Image,             url: '/Client/Gallery',       id:'gallery',         isActive: pathname === '/Client/Gallery' },
     { title: translate('navigation.events'),          icon: Calendar,          url: '/Client/Events',        id:'events',          isActive: pathname === '/Client/Events' },
     { title: translate('navigation.about'),           icon: Library,           url: '/Client/About',         id:'about',           isActive: pathname === '/Client/About' },
     { title: translate('navigation.support'),         icon: Headset,           url: '/Client/Support',       id:'support',         isActive: pathname === '/Client/Support' },
     { title: translate('navigation.terms'),           icon: Handshake,         url: '/Client/Terms',         id:'terms',           isActive: pathname === '/Client/Terms' },
     { title: translate('navigation.policy'),          icon: GlobeLock,         url: '/Client/Policy',        id:'policy',          isActive: pathname === '/Client/Policy' },
   ], [pathname, translate, currentLanguage])
 
   const authenticatedNavigationItems = useMemo(() => [
     { title: translate('navigation.dashboard'),        icon: LayoutDashboard,  url: '/Client/Dashboard', id:'client-dashboard',    isActive: pathname === '/Client/Dashboard' },
     { title: translate('navigation.cbtExam'),         icon: BookOpenCheck,    url: '/client/cbt-exam', id:'cbt-exam',     isActive: pathname === '/client/cbt-exam' },
     { title: translate('navigation.cbtResults'),      icon: Scroll,            url: '/client/cbt-results',id:'/cbt-results',   isActive: pathname === '/client/cbt-results' },
     { title: translate('navigation.applicationForm'), icon: FileText,         url: '/client/application',id:'application',   isActive: pathname === '/client/application' },
     { title: translate('navigation.learn'), icon: School,         url: '/client/learn', id:'learn',   isActive: pathname === '/client/learn' },
   ], [pathname, translate, currentLanguage])
 
   const dropdownItems = useMemo(() => [
     { title: translate('navigation.profile'),   icon: User,     url: '/Client/profile' },
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
           <Skeleton className="w-6 h-6 rounded-full" />
           <Skeleton className="w-48 h-6 ml-2 rounded" />
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
           <Skeleton className="w-4 h-4 rounded" />
           <Skeleton className="w-20 h-4 ml-2" />
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
       return <Skeleton className="w-24 h-6 rounded" />
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