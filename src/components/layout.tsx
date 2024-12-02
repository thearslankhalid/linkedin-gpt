import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import AppNavbar from "@/components/app-navbar"
import { Outlet } from "react-router"

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative w-full h-svh overflow-hidden">
        <AppNavbar />
        <section className="h-full p-4 pt-[4rem] overflow-auto">
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  )
}
