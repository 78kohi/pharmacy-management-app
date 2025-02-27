import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

const MainLayout = () => {
  return (
    <>
      <SidebarProvider>       
        <AppSidebar />
        <div className="flex-1">
          <Navbar />
          <Outlet />
        </div>
      </SidebarProvider>
    </>
  )
}

export default MainLayout