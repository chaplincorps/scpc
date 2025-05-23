'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/images/WaterMark_Logo.png'
import { Languages } from 'lucide-react'
import {useSidebar} from '@/components/ui/sidebar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import NavigationLogic from '@/app/Client/Navigation/NavigationLogic'
import { useTranslation } from '@/utils/translations'

const NavigationContent = ({children}) => {
  const { translate, currentLanguage } = useTranslation()
  const { 
    navigationItems, 
    getCurrentPageTitle, 
    chaplain, 
    isAuthenticated, 
    authInitialized, 
    dropdownItems, 
    getSkeletonDropdownItems,
    languageDropdownItems 
  } = NavigationLogic()
  
  useEffect(() => {
    console.log('NavigationView currentLanguage:', currentLanguage)
  }, [currentLanguage])

  const { state } = useSidebar()
  const sidebarCollapsed = state === 'collapsed'
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  const handleLogout = () => {
    const logoutItem = dropdownItems.find(item => item.title === 'Logout')
    logoutItem?.onClick?.()
  }

  return (
    <div className="flex w-screen min-h-screen bg-white">
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="w-full flex items-center justify-between group-data-[collapsible=icon]:justify-center">
            <div className="flex items-center justify-between w-full">
              {!authInitialized ? (
                <>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full animate-pulse">
                    <Skeleton className="w-8 h-8 rounded-full" />
                  </div>

                  <Skeleton className="h-6 rounded w-45" />

                  <Skeleton className="w-6 h-6 rounded md:hidden" />


                </>
              ) : (
                <>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full">
                    <Image
                      src={Logo}
                      alt="SCPC Logo"
                      width={30}
                      height={30}
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="overflow-hidden transition-[width] duration-300 ease-in-out group-data-[collapsible=icon]:w-0 w-auto">
                    <p className="text-white text-[14px] font-medium whitespace-nowrap">
                      {chaplain.fullName}
                    </p>
                  </div>
                  <div className="md:hidden">
                  <SidebarTrigger className="text-white rounded hover:bg-white/10 hover:text-white" />
                  </div>
                </>
              )}
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <div className="absolute inset-x-0">
            <SidebarSeparator className="h-px bg-white" />
          </div>
          <SidebarMenu className="px-2 pt-3">
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.id || item.title} className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                {item.isSkeleton ? (
                  item.icon()
                ) : (
                  <SidebarMenuButton
                    asChild={!item.onClick}
                    tooltip={item.title}
                    isActive={item.isActive}
                    className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:px-0 hover:bg-white hover:text-[#006699] data-[active=true]:bg-white data-[active=true]:text-[#006699] transition-colors rounded text-white"
                    onClick={() => item.onClick && item.onClick()}
                  >
                    {item.onClick ? (
                      <div className="flex items-center w-full group-data-[collapsible=icon]:justify-center cursor-pointer">
                        <item.icon className="w-5 h-5" />
                        <span className="ml-2 group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </div>
                    ) : (
                      <Link href={item.url || '#'} data-active={item.isActive} className="flex items-center w-full group-data-[collapsible=icon]:justify-center">
                        <item.icon className="w-5 h-5" />
                        <span className="ml-2 group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <div className="absolute inset-x-0">
            <SidebarSeparator className="h-px bg-white" />
          </div>
          <div className="flex items-center justify-center w-full pt-2">
            {!authInitialized ? (
              <Skeleton className="w-full h-6 rounded" />
            ) : (
              <>
                <p className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:text-white group-data-[collapsible=icon]:text-[18px]">
                  &copy;
                </p>
                <p className="flex items-center text-white text-[12px] gap-2 truncate group-data-[collapsible=icon]:hidden">
                  &copy; {translate('common.copyright')}
                </p>
              </>
            )}
          </div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex flex-col flex-1 w-full max-w-full min-w-0">
        <header className={`fixed top-0 right-0 z-50 flex items-center h-[49px]  px-6  bg-[#006699] shadow-md transition-all duration-300 ${sidebarCollapsed ? 'md:pl-12' : 'md:pl-64'} left-0`}>
          <div className="flex items-center w-full p-2">
          {!authInitialized ? (
            <Skeleton className="w-6 h-6 mr-3 rounded" />
          ):(
               <SidebarTrigger className="mr-3 text-white rounded  hover:bg-white/10 hover:text-white" />
            )}
            <Breadcrumb className="text-white">
              <BreadcrumbList>
                {!authInitialized ? (
                  <Skeleton className="h-6 rounded w-28" />
                ) : (
                  <BreadcrumbLink href={isAuthenticated ? '/client/dashboard' : '/client/onboarding'} className="font-bold text-white hover:text-green-100">
                    {chaplain.name}
                  </BreadcrumbLink>
                )}
                <BreadcrumbSeparator className="text-white" />
                <BreadcrumbPage className="text-white">{getCurrentPageTitle()}</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center gap-4 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="relative w-8 h-8 rounded-full hover:bg-white/10"
                  >
                    {!authInitialized ? (
                      <Skeleton className="w-6 h-6 rounded" />
                    ) : (
                      <>
                        <Languages className="w-5 h-5 text-white" />
                        <span className="sr-only">Change Language</span>
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[8px] font-bold text-[#006699]">
                          {currentLanguage.toUpperCase()}
                        </span>
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <Languages className="w-4 h-4" />
                    <span>{translate('navigation.language')}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {!authInitialized ? (
                      Array(6).fill(null).map((_, i) => (
                        <DropdownMenuItem key={i} className="flex items-center gap-2">
                          <Skeleton className="w-4 h-4 rounded" />
                          <Skeleton className="w-16 h-4" />
                        </DropdownMenuItem>
                      ))
                    ) : (
                      languageDropdownItems.map(item => (
                        <DropdownMenuItem 
                          key={item.title}
                          onClick={item.onClick}
                          className="flex items-center gap-2"
                        >
                          {item.icon()}
                          <span>{item.title}</span>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {isAuthenticated && (
                <>
                  <form onSubmit={handleSearch} className="relative flex-1 hidden max-w-md lg:block">
                    {!authInitialized ? (
                      <Skeleton className="w-full rounded h-9" />
                    ) : (
                      <>
                        <Input 
                          type="search" 
                          placeholder={translate('navigation.search')}
                          className="w-full bg-[#006699] text-white placeholder:text-green-100 border-green-500 focus-visible:ring-green-400" 
                          value={searchQuery} 
                          onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                      </>
                    )}
                  </form>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative rounded-full h-9 w-9 hover:bg-green-500">
                        {!authInitialized ? (
                          <Skeleton className="rounded-full h-9 w-9" />
                        ) : (
                          <Avatar className="border-2 border-white h-9 w-9">
                            <AvatarImage src="/placeholder.svg" alt="User" />
                            <AvatarFallback className="bg-white text-[#006699] font-bold">SM</AvatarFallback>
                          </Avatar>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuLabel className="font-normal">
                        {!authInitialized ? (
                          <Skeleton className="w-24 h-4" />
                        ) : (
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">John Doe</p>
                            <p className="text-xs leading-none text-muted-foreground">
                              john.doe@example.com
                            </p>
                          </div>
                        )}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        {dropdownItems.map(item => (
                          <DropdownMenuItem 
                            key={item.title} 
                            onClick={item.title === 'Logout' ? handleLogout : undefined}
                            className={item.title === 'Logout' ? 'text-red-500' : ''}
                          >
                            <item.icon className="w-4 h-4 mr-2" />
                            <span>{item.title}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 mt-12 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

const NavigationView = ({ children }) => {
  const { currentLanguage } = useTranslation()
  
  return (
    <SidebarProvider key={currentLanguage}>
      <NavigationContent>{children}</NavigationContent>
    </SidebarProvider>
  )
}

export default NavigationView