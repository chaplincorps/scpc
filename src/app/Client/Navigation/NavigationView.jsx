'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/images/WaterMark_Logo.png'
import { Menu } from 'lucide-react'
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


const NavigationContent = ({children}) => {
   const { navigationItems, getCurrentPageTitle, chaplain, isAuthenticated, authInitialized, dropdownItems, getSkeletonDropdownItems } = NavigationLogic()
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
    <div className="flex min-h-screen bg-white w-screen">
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="w-full flex items-center justify-between group-data-[collapsible=icon]:justify-center">
            <div className="flex items-center">
              {!authInitialized ? (
                <>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full animate-pulse">
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                  <Skeleton className="ml-3 h-6 w-45 rounded group-data-[collapsible=icon]:hidden" />
                </>
              ) : (
                <>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full">
                    <Image
                      src={Logo}
                      alt="SCPC Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="ml-3 overflow-hidden transition-[width] duration-300 ease-in-out group-data-[collapsible=icon]:w-0 w-auto">
                    <p className="text-white text-[14px] font-medium whitespace-nowrap">
                      {chaplain.fullName}
                    </p>
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
                    className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:px-0 hover:bg-white hover:text-[#006699] data-[active=true]:bg-white data-[active=true]:text-green-600 transition-colors rounded text-white"
                    onClick={() => item.onClick && item.onClick()}
                  >
                    {item.onClick ? (
                      <div className="flex items-center w-full group-data-[collapsible=icon]:justify-center cursor-pointer">
                        <item.icon className="h-5 w-5" />
                        <span className="ml-2 group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </div>
                    ) : (
                      <Link href={item.url || '#'} data-active={item.isActive} className="flex items-center w-full group-data-[collapsible=icon]:justify-center">
                        <item.icon className="h-5 w-5" />
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
          <div className="w-full flex items-center justify-center pt-2">
            {!authInitialized ? (
              <Skeleton className="h-5 w-full rounded bg-white/50" />
            ) : (
              <>
                <p className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:text-white group-data-[collapsible=icon]:text-[18px]">
                  &copy;
                </p>
                <p className="flex items-center text-white text-[12px] gap-2 truncate group-data-[collapsible=icon]:hidden">
                  &copy; {chaplain.rights}
                </p>
              </>
            )}
          </div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 flex flex-col min-w-0 max-w-full w-full">
        <header className={`fixed top-0 right-0 z-5 flex items-center h-14.5 px-6 border-b bg-[#006699] shadow-md transition-all duration-300 ${sidebarCollapsed ? 'md:pl-12' : 'md:pl-64'} left-0`}>
          <div className="flex items-center w-full">
            <SidebarTrigger className="mr-3 text-white hover:bg-white rounded">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <Breadcrumb className="text-white">
              <BreadcrumbList>
                  {!authInitialized ? (
                    <Skeleton className="h-6 w-28 rounded" />
                  ) : (
                    <BreadcrumbLink href={isAuthenticated ? '/client/dashboard' : '/client/onboarding'} className="font-bold text-white hover:text-green-100">
                      {chaplain.name}
                    </BreadcrumbLink>
                  )}
                  <BreadcrumbSeparator className="text-green-200" />
                  <BreadcrumbPage className="text-green-100">{getCurrentPageTitle()}</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
            {isAuthenticated && (
              <div className="flex items-center gap-4 ml-auto">
                <form onSubmit={handleSearch} className="relative hidden lg:block flex-1 max-w-md">
                  {!authInitialized ? (
                    <Skeleton className="h-9 w-full rounded" />
                  ) : (
                    <>
                      <Input type="search" placeholder="Search..." className="w-full bg-[#006699] text-white placeholder:text-green-100 border-green-500 focus-visible:ring-green-400" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-100" />
                    </>
                  )}
                </form>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-green-500">
                      {!authInitialized ? (
                        <Skeleton className="h-9 w-9 rounded-full bg-white/50" />
                      ) : (
                        <Avatar className="h-9 w-9 border-2 border-white">
                          <AvatarImage src="/placeholder.svg" alt="User" />
                          <AvatarFallback className="bg-white text-[#006699] font-bold">SM</AvatarFallback>
                        </Avatar>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 rounded-lg" align="end">
                    <DropdownMenuLabel className="font-normal">
                      {!authInitialized ? (
                        <Skeleton className="h-4 w-24 bg-white/50" />
                      ) : (
                        <div className="flex flex-col">
                          <p className="text-sm font-medium">John Doe</p>
                          <p className="text-xs text-white/80">john.doe@example.com</p>
                        </div>
                      )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {!authInitialized ? (
                        getSkeletonDropdownItems().map(item => (
                          <DropdownMenuItem key={item.id}>{item.icon()}</DropdownMenuItem>
                        ))
                      ) : (
                        dropdownItems.map(item => (
                          <DropdownMenuItem key={item.title} onClick={item.title === 'Logout' ? handleLogout : undefined} className={item.title === 'Logout' ? 'text-red-500' : ''}>
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.title}</span>
                          </DropdownMenuItem>
                        ))
                      )}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 p-4 mt-16 overflow-auto">{children}</div>
      </main>
    </div>
  )
}
 
const NavigationView = ({ children }) => {
   return <SidebarProvider><NavigationContent>{children}</NavigationContent></SidebarProvider>
}

export default NavigationView;